import {Component,Input} from '@angular/core';
import {DataService} from '../../services/services.old';
import {ActivatedRoute} from '@angular/router';
import {Sort} from '@angular/material';

@Component({
    selector: 'fistable',
    templateUrl: 'table.template.html',
    styleUrls: ['table.template.css'],
    providers: [DataService]
})

export class TableTemplateComponent{
    
    @Input()
    url:string;

    subscription;

    table:Table;

    sortedData;

    tdStyle(value:any):any {
        if (!isNaN(value)) {
            value = parseFloat(value).toFixed(2);
            return {'text-align':'right'};
        }
        return'';
    }

    setDecimal(value:any,dp:number):any {
        if (!isNaN(value)) {
            value = parseFloat(value).toFixed(dp);
        }
        return value;
    }
    
    constructor(private route:ActivatedRoute, private dataSrv: DataService){
        
    }

    ngOnInit(): void {
        // this.subscription = this.route.queryParams
        //     .subscribe(params => {this.url = params['url'];this.containerId = params['containerId'];});
        this.dataSrv.getData(this.url).then(response => {
            this.createTableFromJson(response);
        });
    }
    

    createTableFromJson(values:object[]): void {
        this.table = <Table>values[0];
        this.sortedData = this.table.tableData.slice();
    }


    sortData(sort: Sort) {
        const data = this.table.tableData.slice();
        if (!sort.active || sort.direction == '') {
          this.sortedData = data;
          return;
        }
    
        this.sortedData = data.sort((a, b) => {
          let isAsc = sort.direction == 'asc';
          return compare(a[sort.active], b[sort.active], isAsc);
        });
    }
}
    function compare(a, b, isAsc) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
    
class Table{
    columns:TableCol[];
    tableData:object[];
}

class TableCol{
    colName:string;
    colId:number;
}