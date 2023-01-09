import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { URL_PREFIX } from 'src/app/app.component.constant';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(private http: HttpClient, protected snackBar: MatSnackBar) {}

  get(url: string, param?: any) {
    return new Promise((resolve, reject) => {
      let finalUrl = URL_PREFIX.concat(url);
      if (param) {
        finalUrl = finalUrl.concat('?').concat(this.getQueryString(param));
      }
      this.http.get(finalUrl, { observe: 'response' }).subscribe(
        (data: any) => {
          if (data.body.message) {
            this.snackBar.open(data.body.message, 'OK');
          }
          resolve(data.body.data);
        },
        (error) => {
          this.snackBar.open(error.error.error, 'OK');
          reject(null);
        }
      );
    });
  }

  post(url: string, value: any) {
    return new Promise((resolve, reject) => {
      this.http
        .post(URL_PREFIX.concat(url), value, { observe: 'response' })
        .subscribe(
          (data: any) => {
            if (data.body.message) {
              this.snackBar.open(data.body.message, 'OK');
            }
            resolve(data.body.data);
          },
          (error) => {
            this.snackBar.open(error.error.error, 'OK');
            reject(null);
          }
        );
    });
  }

  private getQueryString(param: any) {
    let keys = Object.keys(param);
    let queryString = '';
    for (const key of keys) {
      queryString = queryString.concat(key).concat('=').concat(param[key]);
    }
    return queryString;
  }
}
