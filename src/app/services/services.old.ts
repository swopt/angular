import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Template} from '../template/template.component';
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

    postData(url:string,data:any): Promise <AnalyserNode> {
        
        return this.http.post(url,"data=").toPromise().then(response=>response.json());
    }

     private handleError (error: any): Promise<any> {
        console.error('Error occurred',error);
        return Promise.reject(error.message || error);
    }
}

@Injectable()
export class MetadataService {
    constructor (private http:Http){}
    getMetadata(url:string): Promise<any> {
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

@Injectable()
export class ObservableService {
    constructor (private http:Http){}


    getMetadata(url:string):Observable<any> {
        return this.http.get(url)
        .map(this.extractData)
        .catch(this.handleError);
    }

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }

    private handleError(error:any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}