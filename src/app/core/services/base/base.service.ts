import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected headers: HttpHeaders = new HttpHeaders({});
  public apiUrl: string = environment.apiUrl;

  constructor(
    public router: Router,
    protected http: HttpClient
  ) {}

  public get(options?: string): Observable<any> {
    this.setHeaders(options);

    return this.http.get(this.apiUrl + (options || ''), {
      headers: this.headers
    }).pipe(catchError(this.catchError.bind(this)));
  }

  public post(data?: object, options?: string): Observable<any> {
    this.setHeaders(options);

    return this.http.post<any>(this.apiUrl + (options || ''), data, {headers: this.headers})
            .pipe(catchError(this.catchError.bind(this)));
  }

  public put(data?: object, options?: string): Observable<any> {
    this.setHeaders(options);

    return this.http.put<any>(this.apiUrl + (options || ''), data, {headers: this.headers})
            .pipe(catchError(this.catchError.bind(this)));
  }

  public delete(options?: string): Observable<any> {
    this.setHeaders(options);

    return this.http.delete<any>(this.apiUrl + (options || ''), {headers: this.headers})
            .pipe(catchError(this.catchError.bind(this)));
  }

  protected setHeaders(url: string): void {
    if (url !== '/auth/login' && url !== '/auth/register') {
      let token = JSON.parse(localStorage.getItem('token'));

      token = token ? token.token : '';
      this.headers = new HttpHeaders({Authorization: token});
    }
  }

  protected catchError(err: any): any {
    if (err.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['/auth', 'login']);
    }

    if (err.status === 403) {
      this.router.navigate(['/']);
    }

    return observableThrowError(err.error || {});
  }
}
