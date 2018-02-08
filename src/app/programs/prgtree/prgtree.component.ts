import {Component,Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PrgtreeService} from './prgtree.service';
import {BaseComponent} from '../../components/base.component';
import 'rxjs/add/operator/startWith';
import { Router } from '@angular/router';

@Component({
    selector: 'prgtree',
    templateUrl: 'prgtree.html',
    styleUrls: ['prgtree.css'],
    providers: [PrgtreeService]
})

export class PrgtreeComponent{
    frmCtrl: FormControl;
    prgs: Prgs[];
    prgTrees: Prgtree[] = new Array();
    @Input()
    sidenav:any;

    groupArray = require('group-array');

    constructor(private prgServe: PrgtreeService, private router: Router) {
        this.frmCtrl = new FormControl();
    }

    ngOnInit(): void{
        this.getModules();
    }


    navigate(route:string, id:string) {
        this.router.navigate([route,id]);
    }
    
    getModules() {
        this.prgServe.getModules().then(response => {
            this.prgs = response;
            var grouped = this.groupArray(this.prgs,'subs_code','prg_type');
            for (let module in grouped) {
                let submodule = grouped[module];
                var submodules:Prgtree[] = new Array();
                for (let type in submodule){
                    let prgs = submodule[type];
                    submodules.push(new Prgtree(type,prgs,null));
                }
                this.prgTrees.push(new Prgtree(module,null,submodules));
            }
        });
    }

    clicked(event: Event, module:Prgtree) {
        event.preventDefault();
        
    }
}

export class Prgs {
    prg_id: number;
    prg_name: string;
    prg_type: string;
    prg_desc: string;
    subs_code: string;
    prg_display: string;
}

export class Prgtree{
    moduleName: string;
    prgs: Prgs[];
    submodules: Prgtree[];

    constructor(moduleName:string,prgs:Prgs[],submodules:Prgtree[]){
        this.moduleName = moduleName;
        this.prgs = prgs;
        this.submodules = submodules;
    }
}