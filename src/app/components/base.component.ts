/* Angular references*/
import {Component} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Observable, Subscription} from 'rxjs/Rx';

/* Custom references*/
import {DataModel} from './data.model'; 
import {WebAppService} from '../services/services';

export class BaseComponent {
    title:string;
    dataModel: DataModel;
    metaUrl:string;
    dataUrl:string;
    metaObj: any; dataObj: any;
    metaSubscription: Subscription;
    dataSubscription: Subscription;

    constructor(public service: WebAppService) {
        
    }

    ngOnInit(): void {
        this.metaSubscription = this.service.getMetadata(this.metaUrl)
        .subscribe(value => {this.metaObj = value.data; this.extendedMetaActions()});
        this.dataSubscription = this.service.getData(this.dataUrl)
        .subscribe(value => {this.dataModel = new DataModel(value); this.extendedDataActions()});
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
    
    unsubscribe() {
        this.metaSubscription.unsubscribe();
        this.dataSubscription.unsubscribe();
    }

    extendedMetaActions(){}

    extendedDataActions(){}
    
}
