import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { FieldBase }     from './field-base';

@Component({
  selector: 'df-field',
  templateUrl: './dynamic-form-field.html'
})
export class DynamicFormFieldComponent {
  @Input() field: FieldBase<any>;  
  @Input() form: FormGroup;options: any[];
  @Input() value:any;
  get isValid() { return this.form.controls[this.field.key].valid; }

  setDecimal(value:any,dp:number):any {
    if (!isNaN(value)) {
        value = parseFloat(value).toFixed(dp);
    }
    return value;
  }
  dfStyle(value:any):any {
    if (!isNaN(value)) {
        return {'text-align':'right'};
    }
    return'';
  }
}