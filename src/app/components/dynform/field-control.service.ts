import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { FieldItem } from './field-item';
import { Global } from 'app/components/global';
import { Observable } from 'rxjs/Observable';
import { WebAppService } from 'app/services/services';

@Injectable()
export class FieldControlService {
  constructor(private http: Http, private service: WebAppService) {}

  toFormGroup(fields: FieldItem<any>[] ) {
    let group: any = {};

    fields.forEach(field => {
      group[field.key] = field.required ? new FormControl(field.value || '', Validators.required)
                                              : new FormControl(field.value || '');
    });
    return new FormGroup(group);
  }

  dataChange(resObj, key: string, fg: FormGroup) {
    delete resObj[key];
    fg.patchValue(resObj);
  }

  submit(postUrl: string, payload:any): Observable<any>{
    let search = new URLSearchParams();
    Object.keys(payload).forEach(key => {
      search.append(key,payload[key]);
    });
    return this.service.callApiGet(postUrl,null,search);
  }

  optionSelected(postUrl, field, fg: FormGroup, global: Global){
    var selectedVal = field.selectedRef;
    var body = new URLSearchParams();
    body.append(field.key,selectedVal);
    let headers = new Headers();
    headers.append('Content-type','application/x-www-form-urlencoded');
    this.service.callApiPost(postUrl,headers,body).subscribe(
      value => this.dataChange(value, field.key, fg),
      error => console.log(error.json())
    );
  }

  

}