export class CodeSample {
    enquiry = new Enquiry();
    services = new Services();
}

class Enquiry {
    htmlContent:string = `
        <div>
            <button md-button (click)="openDialog()">&lt; &gt;</button>
            <h4>{{title}}</h4>
            <div id="header" style="display:inline-block;vertical-align:top" *ngFor="let headcol of template.headColumns" >
                <dynamic-field *ngIf="headcol.headFields" [fields]="headcol.headFields" [values]="values"></dynamic-field>
            </div>
            <div id="content">
                <md-tab-group>
                    <md-tab label="Group by Currency"><fistable md-tab-content [url]="'http://fis:3333/json/dummytable1'"></fistable></md-tab>
                    <md-tab label="Open Item"><fistable md-tab-content [url]="'http://fis:3333/json/dummytable2'"></fistable></md-tab>
                    <md-tab label="Bal. B. Fwd."></md-tab>
                </md-tab-group>

            </div>
        </div>
        `;
    tsContent:string = `
        import {Component} from '@angular/core';
        import {Router,ActivatedRoute} from '@angular/router';
        import {MdDialog} from '@angular/material';
        import {FisTemplateComponent} from '../template/template.component';
        import {TemplateService} from '../template/template.service';
        import {DataService} from '../data/data.service';
        import {CodeDialogComponent} from '../template/code.dialog/code.dialog.component';
        
        
        @Component({
            templateUrl: 'enquiry.html',
            providers: [TemplateService, DataService]
        })
        
        export class EnquiryComponent extends FisTemplateComponent{
            id:number;
            prgName:string;
            subscription;
            
            templateUrl = 'http://fis:3333/json/enquiry_sample';
            dataUrl = 'http://fis:3333/json/enquiry_sample.data';
        
            constructor(private route: ActivatedRoute, 
                tplSrv:TemplateService, dataSrv:DataService, public dialog:MdDialog) {
                super(tplSrv,dataSrv);
            }
        
            openDialog():void {
                let dialogRef = this.dialog.open(CodeDialogComponent, {
                });
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
        }
        
        class AccountProfile{
            accNo:string;
            accName:string;
            orgnName:string;
            orgnCode:string;
            nature:string;
        }
    `;
}

class Services {
    metadataSrv:string = `
        import {Injectable} from '@angular/core';
        import {Template} from './template.component';
        import {Http,Response} from '@angular/http';
        import {Observable} from 'rxjs/Rx';
        import 'rxjs/add/operator/catch';
        import 'rxjs/add/operator/map';
        import 'rxjs/add/operator/toPromise';
        
        @Injectable()
        export class TemplateService {
            constructor (private http:Http){}
            getTemplate(url:string): Promise<Template> {
                return this.http.get(url)
                            .toPromise()
                            .then(response => response.json().data as Template)
                            .catch(this.handleError);
            }
        
            private handleError (error: any): Promise<any> {
                console.error('Error occurred',error);
                return Promise.reject(error.message || error);
            }
        }
    `;
    dataSrv:string = `
        import {Injectable} from '@angular/core';
        import {Http,Response} from '@angular/http';
        import {Observable} from 'rxjs/Rx';
        import 'rxjs/add/operator/catch';
        import 'rxjs/add/operator/map';
        import 'rxjs/add/operator/toPromise';
        
        @Injectable()
        export class DataService {
            constructor (private http:Http){}
            getData(url:string): Promise<any> {
                return this.http.get(url)
                            .toPromise()
                            .then(response => response.json().data as any)
                            .catch(this.handleError);
            }
        
            private handleError (error: any): Promise<any> {
                console.error('Error occurred',error);
                return Promise.reject(error.message || error);
            }
        }
    `;
    metaJson:string = `
        {"data":{
            "docHeader": {"docTitle": "AP Account Ledger Enquiry"},
            "headColumns":[
                    {"headFields": [
                            {"key":"accName","label":"Account Name","controlType":"textboxauto","required":true,"order":1},
                            {"key":"remark","label":"Remark","controlType":"textarea","order":2},
                            {"key":"accStatus","label":"Account Status","value":"Active","controlType":"dropdown","options":[{"key":"active","value":"Active"},{"key":"dactive","value":"Deactivated"}],"order":3},
                            {"key":"term","label":"Term (days)","type":"number","step":0.01,"controlType":"textbox","order":4},
                            {"key":"dateCreate","label":"Date Created","controlType":"textbox","type":"date","order":1},
                            {"key":"credLimit","label":"Credit Limit","controlType":"textbox","type":"number","step":0.01,"order":2},
                            {"key":"credAvail","label":"Credit Available","controlType":"textbox","type":"number","step":0.01,"order":3},
                            {"key":"debBal","label":"Debit Balance","controlType":"textbox","type":"number","step":0.01,"order":4},
                            {"key":"credBal","label":"Credit Balance","controlType":"textbox","type":"number","step":0.01,"order":5},
                            {"key":"outBal","label":"Outstanding Balance","controlType":"textbox","type":"number","step":0.01,"order":6}
                    ]}
                    
            ],
            "detFields": [
                    {"key":"comName","label":"Company Name","value":"ABCorp","order":1},
                    {"key":"email","label":"Email","type":"email","order":2},
                    {"key":"password","label":"Password","type":"password","order":3}
            ]
        }}
    `;
    dataJson:string = `
        {"data":{
            "accName":"ABCorp",
            "remark":"The quick brown fox jumps over the lazy dog.",
            "accStatus":{"value":"active","title":"Active"},
            "term":30,
            "dateCreate":"2017-08-27",
            "credLimit":300,
            "credAvail":10,
            "debBal":19.80,
            "credBal":20.55,
            "outBal":89.56}
        }
    `;

}