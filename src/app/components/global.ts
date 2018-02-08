import {Injectable} from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class Global {
    bBaseUri: string = "http://fisweb:3001";
    
    constructor (private http: Http){}
    
    getCompleteUrl(url: string) {
        return this.bBaseUri + url;
    }
}