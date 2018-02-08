import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import {Http,Headers} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { FieldItem }     from './field-item';
import { FormControl } from '@angular/forms';
import { DataModel } from 'app/components/data.model';

@Component({
  selector: 'df-item',
  templateUrl: './dynform-item.html'
})
export class DynformItemComponent {
  @Input() field: FieldItem<any>;  
  @Input() formGroup: FormGroup;options: any[];
  @Input() meta: any;
  @Input() value: any;
  @Output() dataModel = new EventEmitter<DataModel>();
  

  filteredOptions: Observable<Object[]>;
  formControl = new FormControl();
  selectedOption:any;

  constructor(private http:Http){}

  ngOnInit() {
    this.filteredOptions = this.formControl.valueChanges
      .startWith(``)
      .map(value => this.filterOptions(value));
  }

  get isValid() { return this.formGroup.controls[this.field.key].valid; }

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

  filterOptions (inputValue:string):Object[] {
    return this.field.reference_values.filter(option =>
      option.value.toLowerCase().indexOf(inputValue.toLowerCase())===0)
  }

  optionSelected(){
    var selectedVal = this.selectedOption;
    var body = this.field.key+`=`+selectedVal;
    var headers = new Headers();
    headers.append('Content-type','application/x-www-form-urlencoded');
    this.http.post(this.meta.endpoints.list.url,body,{headers:headers}).subscribe(
      res => {
        this.dataModel.emit(res.json());
      },
      error => {console.log(headers);console.log(JSON.stringify(error.json))}
    );
  }

  getStep(value) {
    if(isNaN(value)) return '';
    let $val = value+'';
    let decPoint = ($val.length-1) - $val.indexOf('.');
    let step = 1/(10**decPoint);
    console.log(step);
    return step;
  }
}