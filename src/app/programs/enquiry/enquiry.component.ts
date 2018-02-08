import {Component} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {FisTemplateComponent,SimpleDialog} from '../../template/template.component';
import {DataService,MetadataService,ObservableService} from '../../services/services.old';
import {CodeDialogComponent} from '../../template/code.dialog/code.dialog.component';
import {MatDialog} from '@angular/material';


@Component({
    templateUrl: 'enquiry.html',
    providers: [MetadataService, DataService, ObservableService]
})

export class EnquiryComponent extends FisTemplateComponent{
    id:number;
    prgName:string;
    subscription;
    
    metaUrl = 'http://fis:3333/json/enquiry_sample';
    dataUrl = 'http://fis:3333/json/enquiry_sample.data';

    constructor(private route: ActivatedRoute, 
        meta:MetadataService, dataSrv:DataService, 
        obSrv:ObservableService, private dialog:MatDialog) {
        super(meta,dataSrv,obSrv);
    }

   ngOnInit(){
        super.ngOnInit();
        this.subscription = this.route.queryParams
        .subscribe(params => {
            this.id = params['id'];
            this.prgName = params['prgName'];
            this.title = this.prgName;
        });
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    submit(){
        super.submit();
        let jsonValues = JSON.stringify(this.values);
        this.dialog.open(SimpleDialog,{width:'500px',data:"Sending values to server :"+jsonValues});
    }
}

class AccountProfile{
    accNo:string;
    accName:string;
    orgnName:string;
    orgnCode:string;
    nature:string;
}