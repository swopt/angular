import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { FieldBase }              from './field-base';
import { FieldControlService }    from './field-control.service';

@Component({
  selector: 'dynamic-field',
  templateUrl: './dynamic-field.html',
  providers: [ FieldControlService ]
})
export class DynamicFieldComponent implements OnInit {

  @Input() fields: FieldBase<any>[] = [];
  @Input() values:any;
  form: FormGroup;
  payLoad = '';

  constructor(private fcs: FieldControlService) { 
    
  }

  ngOnInit() {
    this.form = this.fcs.toFormGroup(this.fields );
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}