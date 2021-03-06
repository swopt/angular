import {Injectable} from '@angular/core';
import {Http,Headers,URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Global } from 'app/components/global';
import { Router } from '@angular/router';


@Injectable()
export class WebAppService{
    userdat= {user: 'abc', pass: '123'};

    constructor (private http:Http, private global:Global, private router:Router){}

    getData<T>(url:string): Observable<T> {
        return new Observable(observer => {
            var headers = new Headers();
            setTimeout(() => {
                    this.http.get(url).toPromise()
                    .then(response => {
                        observer.next(response.json().data as T);
                    })
                },
                1000
            );
        })
    }

    /* GET JWT Authentication Token from server and stores it in localStorage */
    getAuthKey(userdat: {user:string, pass:string}): Observable<string> {
        return new Observable(observer => {
            let authKey = localStorage.getItem("auth-key");
            if (authKey === null) {
              let body = new URLSearchParams();
              body.append("username",userdat.user);
              body.append("password",userdat.pass);
              this.http.post(this.global.bBaseUri+"/api/signin",body).subscribe(
                res => {
                  authKey = res.json().data;
                  localStorage.setItem("auth-key",authKey+'');
                  observer.next(authKey);
                  observer.complete();
                },
                error => {
                    observer.error(error.json());
                    observer.complete();
                }
              );
            }
            observer.next(authKey);
            observer.complete();
        });
    }

    /* Called when Authentication Token expires, removes expired Auth token and retrieves new Auth Token*/
    resetAuthKey() {
        localStorage.removeItem("auth-key");
        this.getAuthKey(this.userdat).subscribe(value => this.router.navigate(['']));
    }

    /* GET data from backend*/
    callApiGet(url: string,headers?: Headers, search?: URLSearchParams): Observable<any> {
        return new Observable(observer => {
            this.getAuthKey(this.userdat).subscribe(
                value => {
                    let hdrs: Headers = new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+value
                    });
                    if(headers) headers.keys().forEach(key => {
                        hdrs.append(key, headers.get(key));
                    });
                    this.http.get(url,{headers: hdrs, search: search}).subscribe(
                        res => {
                            observer.next(res.json());
                            observer.complete();
                        },
                        error => {
                            if (error.json().errors.exception === "jwt expired"){
                                this.resetAuthKey();
                            }
                            observer.error(error);
                        }
                    )
                }
            )
        });
    }
    
    /* POST data to backend*/
    callApiPost(url: string, headers?: Headers, body?: any, search?: URLSearchParams): Observable<any> {
        return new Observable(observer => {
            this.getAuthKey(this.userdat).subscribe(
                value => {
                    console.log(value);
                    let hdrs: Headers = new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+value
                    });
                    if (headers) headers.keys().forEach(key => {
                        hdrs.append(key, headers.get(key));
                    });
                    this.http.post(url,body,{headers: hdrs,search: search}).subscribe(
                        res => {
                            observer.next(res.json());
                            observer.complete();
                        },
                        error => {
                            if (error.json().errors.exception === "jwt expired"){
                                this.resetAuthKey();
                            }
                            observer.error(error.json());
                            observer.complete();
                        },
                    );
                }
            );
        });
    }

    getMetadata(url:string): Observable<any> {
        return this.callApiGet(url);
    }
}
