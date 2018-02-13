import { Component, Input, Output, OnInit, EventEmitter }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { Http, Headers} from '@angular/http';
import { FieldItem }              from './field-item';
import { FieldControlService }    from './field-control.service';
import { DataModel } from 'app/components/data.model';
import { Global } from 'app/components/global';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from 'app/components/dialog/dialog.component';

@Component({
  selector: 'dynform',
  templateUrl: './dynform.html',
  providers: [ FieldControlService,Global]
})
export class DynformComponent implements OnInit {

  @Input() fields: FieldItem<any>[] = [];
  @Input() meta: any;
  @Input() values:any;

  @Input() dataModel: DataModel = new DataModel({});
  @Output() newItem: EventEmitter<any> = new EventEmitter<any>();
  
  formGroup: FormGroup;
  payLoad = '';
  postUrl: string;

  constructor(private global: Global, private fcs: FieldControlService, private dialog: MatDialog) { 
    
  }

  
  ngOnInit() {
    this.formGroup = this.fcs.toFormGroup(this.fields );
    this.postUrl = this.global.getCompleteUrl(this.meta.endpoints.insert.url);
  }
  
  /* form submit action*/
  onSubmit() {
    this.payLoad = this.formGroup.value;
    let result = this.fcs.submit(this.postUrl,this.payLoad);
    result.subscribe(
      value => {
        console.log(value);
        if (value.data) {
            this.newItem.emit(value.data);
        }
      },
      error => {
        let err = error.json();
        console.log(err);
        if (err.errors.exception) this.openMsgDialog({data:{msg:err.errors.exception}});
        else if (err.errors.invalid) {
          Object.keys(err.errors.invalid).forEach(key => {
            this.formGroup.get(key).setErrors(err.errors.invalid[key]);
            let field = this.fields.find(i => i.key === key);
            field.error = err.errors.invalid[key][0];
          });
        }
      }
    )
  }
  
  dfStyle(value:any):any {
    if (!isNaN(value)) {
      return {'text-align':'right'};
    }
    return'';
  }

  modelChangeAction(){
    
  }

  /* opens message dialog when called*/
  openMsgDialog(config: MatDialogConfig) {
    this.dialog.open(DialogComponent,config);
  }

}