import {Component, AfterViewChecked,ElementRef} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {HighlightJsService} from 'angular2-highlight-js';
import {CodeSample} from './code.sample';
import * as fs from 'fs';

import '../code.dialog/prettify';


@Component({
    selector: 'code-dialog',
    templateUrl: './code.dialog.html',
})

export class CodeDialogComponent implements AfterViewChecked{
    codeSample = new CodeSample();
    htmlContent = '';
    tsContent = '';
    metaService:string;
    dataService:string;
    
    entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };

    constructor(public dialogRef:MatDialogRef<CodeDialogComponent>, 
        private elRef: ElementRef, private hljsService: HighlightJsService){
           this.htmlContent = this.escapeHtml(this.codeSample.enquiry.htmlContent);
           this.tsContent = this.escapeHtml(this.codeSample.enquiry.tsContent);
           this.metaService = this.escapeHtml(
               this.codeSample.services.metadataSrv+`/*JSON Sample*/`+this.codeSample.services.metaJson);
           this.dataService = this.escapeHtml(
               this.codeSample.services.dataSrv+`/*JSON Sample*/`+this.codeSample.services.dataJson);
    }

    onClose():void {
        this.dialogRef.close();
    }

    ngAfterViewChecked(){
        var html = this.elRef.nativeElement.querySelector('.html');
        var ts = this.elRef.nativeElement.querySelector('.typescript');
        if(html!=null)this.hljsService.highlight(html);
        else if(ts!=null)this.hljsService.highlight(ts);
    }

    readFile(filePath:string){
        var result;
        fs.readFile(filePath,'utf8',(err,data) => {
            console.log(data.toString);
            result = data.toString;
        });
        return result;
    }

    
    escapeHtml(source: string) {
        return String(source).replace(/[&<>"'\/]/g, s => this.entityMap[s]);
    }
}