import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { URL_PREFIX } from "src/app/app.component.constant";

@Injectable({
  providedIn: "root",
})
export class TemplateService {
  private user: any;
  private role: any;
  onUserRoleChange = new EventEmitter();

  setUser(username: any) {
    sessionStorage.setItem("user", username);
    this.user = username;
  }

  getUser() {
    if (!this.user) {
      this.user = sessionStorage.getItem("user");
    }
    return this.user;
  }

  setRole(role: any) {
    if (role != this.role) this.onUserRoleChange.emit(role);
    sessionStorage.setItem("role", role);
    this.role = role;
  }

  getRole() {
    if (!this.role) {
      this.role = sessionStorage.getItem("role");
    }
    return this.role;
  }

  constructor(
    private http: HttpClient,
    protected snackBar: MatSnackBar,
    protected router: Router
  ) {}

  get(url: string, param?: any) {
    return new Promise((resolve, reject) => {
      let finalUrl = URL_PREFIX.concat(url);
      if (param) {
        finalUrl = finalUrl.concat("?").concat(this.getQueryString(param));
      }
      this.http.get(finalUrl, { observe: "response" }).subscribe(
        (data: any) => {
          if (data.body.message) {
            this.snackBar.open(data.body.message, "OK");
          }
          resolve(data.body.data);
        },
        (error) => {
          this.handleError(reject, error);
        }
      );
    });
  }

  post(url: string, value: any) {
    return new Promise((resolve, reject) => {
      this.http
        .post(URL_PREFIX.concat(url), value, { observe: "response" })
        .subscribe(
          (data: any) => {
            if (data.body.message) {
              this.snackBar.open(data.body.message, "OK");
            }
            resolve(data.body.data);
          },
          (error) => {
            this.handleError(reject, error);
          }
        );
    });
  }

  private getQueryString(param: any) {
    let keys = Object.keys(param);
    let queryString = "";
    let index = 0;
    for (const key of keys) {
      if (index++ > 0) {
        queryString = queryString.concat("&");
      }
      queryString = queryString.concat(key).concat("=").concat(param[key]);
    }
    return queryString;
  }

  private handleError(reject: (reason?: any) => void, error: any) {
    if (error.error.error == "Session Expired! Please Login Again!") {
      this.snackBar
        .open(error.error.error, "OK", { duration: 3 * 1000 })
        .onAction()
        .subscribe(() => {
          this.router.navigate(["/login"]);
          reject(null);
        });
      setTimeout(() => {
        this.router.navigate(["/login"]);
      }, 3000);
    } else {
      this.snackBar.open(
        error.error.error ? error.error.error : error.message,
        "OK",
        { duration: 3 * 1000 }
      );
      reject(null);
    }
  }
}
