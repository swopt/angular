import { Component,ViewEncapsulation } from '@angular/core';
import {MatDialog} from '@angular/material';
import {CodeDialogComponent} from './template/code.dialog/code.dialog.component';
import { Router, Route } from '@angular/router';

import * as comps from './components';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Financial Information System';
  httpSubs: Subscription;


  constructor(private dialog:MatDialog, private router: Router, private http: Http){
    
  }
  
  ngOnInit() {
    /*
    let routes = this.router.config;
    this.httpSubs = this.http.get('http://192.168.100.107:3000/routes').map(res => res.json()).subscribe(result => {
      let path: string = result[0].path;
      result.forEach(route => {
        if (route.type === "form")routes.push({path: route.path, component: comps.FormComponent, data: route.data});
      });
      this.router.resetConfig(routes);
      this.router.navigate([path]);
    });
    */
    //this.router.config.push({path: "base", component: comps.FormComponent, data: {metaUrl: "http://fis:3000/form"}})
  }

  ngOnDestroy() {
    this.httpSubs.unsubscribe();
  }

  openCodeDialog():void {
    this.dialog.open(CodeDialogComponent,{});
  }
}
