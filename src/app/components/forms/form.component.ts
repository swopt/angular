import {Component, Input, Pipe, PipeTransform} from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {BaseComponent} from '../base.component';
import {WebAppService} from '../../services/services';
import { FieldItem } from 'app/components/dynform/field-item';
import { Subscription } from 'rxjs/Subscription';
import { Global } from 'app/components/global';
import { Http, Headers } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'fisform',
    templateUrl: 'form.html',
    styleUrls: ['form.css'],
    providers: [WebAppService, Global]
})

export class FormComponent extends BaseComponent{
    formModel: FormModel = new FormModel({},{}, new FormBuilder());

    @Input() metaUrl;
    @Input() dataUrl;
    listing: Array<any>;
    routeSub: Subscription;

    constructor(service: WebAppService, private route: ActivatedRoute, 
        private http: Http, private global: Global) {
        super(service);
    }

    ngOnInit():void {
        this.routeSub = this.route.data.subscribe (v => {
            this.metaUrl = "http://fisweb:3001/api/meta_data?id=personal";
            this.dataUrl = v.dataUrl;
            super.ngOnInit();
        })
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        super.ngOnDestroy();
    }

    extendedMetaActions(){
        super.extendedMetaActions();
        var url = this.global.getCompleteUrl(this.metaObj.endpoints.list.url);
        let listingObservable = this.service.callApiGet(url);
        listingObservable.subscribe(
            value => {
                this.listing = value.data;
            }
        )
        this.formModel = new FormModel(this.metaObj,this.dataObj,new FormBuilder());
    }

    extendedDataActions(){
        super.extendedDataActions();
        this.formModel = new FormModel(this.metaObj,this.dataObj,new FormBuilder());
    }

    addItem(obj:any) {
        this.listing.push(obj);
    }

    stringify(obj:any) {
        return JSON.stringify(obj);
    }
}

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}

export class FormModel {
    fields: FieldItem<any>[];
    endpoints: any;
    title: string = `Form Component`;

    constructor (private metaObj:any, private dataObj:any, private frmBld:FormBuilder){
        this.title = metaObj.title;
        if(metaObj.fields) metaObj.fields.forEach(field => {
            field.error = field.label + ' is required.';
        });
        this.fields = metaObj.fields;
        this.endpoints = metaObj.endpoints;
    }
}