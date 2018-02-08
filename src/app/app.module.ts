import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {MatSidenavModule,MatButtonModule,MatIconModule,MatTabsModule,
  MatInputModule,MatSelectModule,MatAutocompleteModule,MatSortModule,
  MatDialogModule,MatMenuModule,MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import * as comps from './components';
import {FisTemplateComponent,SimpleDialog} from './template/template.component';
import {EnquiryComponent} from './programs/enquiry/enquiry.component';
import {PrgtreeComponent} from './programs/prgtree/prgtree.component';
import {TableTemplateComponent} from './template/table/table.template.component';
import {DynamicFieldComponent} from './template/field/dynamic-field.component';
import {DynamicFormFieldComponent} from './template/field/dynamic-form-field.component';
import {CodeDialogComponent} from './template/code.dialog/code.dialog.component';
import {AppMenuComponent} from './components/appmenu/appmenu.component';

import {HighlightJsModule,HighlightJsService} from 'angular2-highlight-js';

import 'hammerjs';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'base'},
  {path: 'base', component: comps.FormComponent},
  {path: 'template', component: FisTemplateComponent},
  {path: 'enquiry', component: EnquiryComponent},
  
]
@NgModule({
  declarations: [
    AppComponent,
    comps.FormComponent,comps.KeysPipe,comps.DialogComponent,
    comps.DynformComponent,comps.DynformItemComponent,
    FisTemplateComponent,DynamicFieldComponent,DynamicFormFieldComponent,
    EnquiryComponent,PrgtreeComponent,TableTemplateComponent,CodeDialogComponent,AppMenuComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(routes),
    FormsModule,ReactiveFormsModule,
    HttpModule,BrowserAnimationsModule,
    MatSidenavModule,MatIconModule,MatButtonModule,MatTabsModule,
    MatInputModule,MatSelectModule,MatAutocompleteModule,MatSortModule,
    MatDialogModule,MatMenuModule,MatToolbarModule,
    HighlightJsModule
  ],
  entryComponents: [CodeDialogComponent,comps.FormComponent,comps.DialogComponent],
  providers: [HighlightJsService],
  bootstrap: [AppComponent]
})

export class AppModule { }
