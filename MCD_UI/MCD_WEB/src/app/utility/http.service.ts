import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class HttpService {

  User: any;
  constructor(private _http: HttpClient, private ngZone: NgZone) {


  }

  GetAll(url: string): Observable<any> {

      var URL = environment.apiUrl + url;
    return this._http.get(URL, { responseType: 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }

  Get(url: string, paramList: string[]): Observable<any> {
var URL = environment.apiUrl + url;
    var params = URL;
    // paramList.forEach(s => { params = [params, s].join("/") })
    paramList.forEach(s => { params = [params, s.replace(/\//g, '-').replace(/\\/g, '-')].join("/"); })
    return this._http.get(params, { responseType: 'json' });
  }

  Get1(url: string, arg: any = null): Observable<any> {
 var URL = environment.apiUrl + url;
    if (arg) {
      let param = new HttpParams()
      Object.keys(arg).forEach((key: any) => {
        param = param.set(key, arg[key]);
      });
      return this._http.get<any>(URL, { params: param });
    }
    else
      return this._http.get<any>(URL,);
  }

  Post(url: string, params: any, isResponseBlob?: any): Observable<any> {
    // this.User = this._storageService.GetLoggedInUser();
      var URL = environment.apiUrl + url;
    if (isResponseBlob)
      return this._http.post(URL, params, { responseType: 'blob' });
    else
      return this._http.post(URL, params, { responseType: 'json' });
  }


  Token(url: string): Observable<any> {

    return this._http.get(environment.apiUrl.concat(url), { responseType: 'json' });
  }

 

    RefreshToken(url: string, params: any, isResponseBlob?: any): Observable<any> {
    // this.User = this._storageService.GetLoggedInUser();
var URL = environment.apiUrl + url;
    if (isResponseBlob)
      return this._http.post(URL, params, { responseType: 'blob' });
    else
      return this._http.post(URL, params, { responseType: 'json' });
  }

  ClearCookies(url: string): Observable<any> {
    return this._http.get(environment.apiUrl.concat(url), { responseType: 'json' });

  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  GetStaticText() {
    return this._http.get("assets/staticText.json");
  }

  GetRAMatrixJson() {
    return this._http.get("assets/staticfiles/ramvalue.json");
  }
}
