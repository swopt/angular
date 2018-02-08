import {Injectable} from '@angular/core';
import {Prgs} from './prgtree.component';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PrgtreeService {
    constructor (private http: Http){}
    getModules(): Promise<Prgs[]> {
        return this.http.get('http://fis:3000/prgtree')
                    .toPromise()
                    .then(response => response.json().recordsets[0] as Prgs[])
                    .catch(this.handleError);
    }

    private handleError (error: any): Promise<any> {
        console.error('Error occurred',error);
        return Promise.reject(error.message || error);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    getModTreeItemsSlowly(): Promise<Prgs[]> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getModules()), 2000);
        });
    }
}