import { Component, Input, Output, OnInit, EventEmitter }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { Http, Headers} from '@angular/http';
import { FieldItem }              from './field-item';
import { FieldControlService }    from './field-control.service';
import { DataModel } from 'app/components/data.model';
import { Global } from 'app/components/global';
import { MatDialog } from '@angular/material';
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
        if (error.exception) this.openMsgDialog(error.exception);
        else if (error.invalid) {

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

  openMsgDialog(message: string) {
    this.dialog.open(DialogComponent,{data:{msg:message},width:"350px",height:"100px"});
  }

}