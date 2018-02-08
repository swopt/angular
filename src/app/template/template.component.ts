import {Component, Inject} from '@angular/core';
import {DataService, MetadataService, ObservableService} from '../services/services.old';
import {FieldBase} from './field/field-base';
import {Http,Response} from '@angular/http';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'fis-template',
    templateUrl: 'template.html',
    providers: [MetadataService,DataService,ObservableService]
})

export class FisTemplateComponent {
    template: Template = new Template;
    title:string;
    values:any;

    metaUrl = 'http://fis:3333/json/template';
    dataUrl= 'http://fis:3333/json/enquiry_sample.data';
    
    constructor(private meta: MetadataService,
        private dataSrv: DataService, private obSrv: ObservableService) {
        
    }
    
    ngOnInit(): void {
        this.getData(this.dataUrl);
    }
    
    getData(dataUrl:string):any{
        this.dataSrv.getData(dataUrl).then(response =>{
            console.log(response);
            this.values = response;
            this.getMetadata(this.metaUrl);
         });
    }

    private getMetadata(url:string){
        this.meta.getMetadata(url).then(response => {
            this.template = response;
            this.title = this.template.docHeader.docTitle;
        });
    }

    submit(){
        this.verify();
        console.log(this.values);
    }

    private verify() {

    }
    
}

@Component({
    selector: 'simple-dialog',
    template: '{{data}}'
})
export class SimpleDialog {
    constructor (public dialogRef:MatDialogRef<SimpleDialog>, @Inject(MAT_DIALOG_DATA) public data:any){}

    onNoClick(): void {
        this.dialogRef.close();
    }
}



export class Template {
    docHeader: DocHeader = new DocHeader;
    headColumns: any[];
    headFields: FieldBase<any>[];
    detFields: FieldBase<any>[];
    btnFields: any[];
}

class DocHeader {
    docTitle:string;
}