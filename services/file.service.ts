import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as FileSaver from "file-saver";
import { Dropbox } from "dropbox";

@Injectable({
  providedIn: "root",
})
export class FileService {
  private newFile: any;
  TOKEN: any =
    "Bearer sl.BW7I6RhZwZbjmcQ9cCkF1d0jp_F-YLXQGhtsFAHQMhfVAhp1B7DNDMtzrc4nhpni51b9AkeVrI5EBHyaUj1bH9kN5rt-IYVokCoE7Ebz9ICRyuUcq0pYKlXcb46jYFsLzjW4NH8";
  CLIENT_ID = "nnama4iyjd9a1d6";
  REDIRET_URL = "http%3A%2F%2localhost%3A4200";

  async getAccess() {
    const dbx: any = new Dropbox({
      accessToken: "YOUR_APP_KEY",
      fetch,
    });
    const access_token = await dbx.authToken.create({
      grant_type: "client_credentials",
    });
    console.log(access_token);
  }

  constructor(protected http: HttpClient, protected snackBar: MatSnackBar) {
    // TODO: not sure when the token is expired, currently already one day still same
    // if (!this.TOKEN) {
    this.getAccess();
    // this.http
    //   .get(
    //     // https://www.dropbox.com/oauth2/authorize?client_id=MY_CLIENT_ID&redirect_uri=MY_REDIRECT_URI&response_type=code
    //     "https://www.dropbox.com/oauth2/authorize?client_id=" +
    //       this.CLIENT_ID +
    //       "&redirect_uri=" +
    //       this.REDIRET_URL +
    //       "&response_type=code",
    //     // { headers: { "Access-Control-Allow-Origin": "*" } }
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "http://localhost:4200",
    //       },
    //     }
    //   )
    //   .subscribe((data: any) => {
    //     console.log(data);
    //   });
    // https://www.dropbox.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=files.content.read&account_info.read
    // }
  }

  download(fileName: any) {
    return new Promise((resolve, reject) => {
      this.http
        .post("https://content.dropboxapi.com/2/files/download", null, {
          headers: {
            Authorization: this.TOKEN,
            "Dropbox-API-Arg": '{"path":"/' + fileName + '"}',
          },
          responseType: "blob",
        })
        .subscribe(
          (data: any) => {
            FileSaver.saveAs(data, fileName);
            resolve(null);
          },
          (error) => {
            this.snackBar.open(
              "There is An Error. Please screenshot and report a bug. Error: " +
                error.statusText
            );
            reject(null);
          }
        );
    });
  }

  upload(data: any, fileName: any) {
    return new Promise((resolve, reject) => {
      this.http
        .post("https://content.dropboxapi.com/2/files/upload", data, {
          headers: {
            Authorization: this.TOKEN,
            "Dropbox-API-Arg":
              '{"autorename":false,"mode":"add","mute":false,"path":"' +
              "/".concat(fileName) +
              '","strict_conflict":false}',
            "Content-Type": "application/octet-stream",
          },
        })
        .subscribe(
          (data: any) => {
            this.snackBar.open("successfully uploaded the file!");
            resolve(null);
          },
          (error) => {
            this.snackBar.open(
              "There is An Error. Please screenshot and report a bug. Error: " +
                error.statusText
            );
            reject(null);
          }
        );
    });
  }

  delete(fileName: any) {
    return new Promise((resolve, reject) => {
      fileName = (fileName[0] == "/" ? "" : "/").concat(fileName);
      this.http
        .post(
          "https://api.dropboxapi.com/2/files/delete_v2",
          { path: fileName },
          {
            headers: {
              Authorization: this.TOKEN,
              "Content-Type": "application/octet-stream",
            },
          }
        )
        .subscribe(
          (data: any) => {
            // this.snackBar.open("successfully deleted the file!");
            resolve(null);
          },
          (error) => {
            this.snackBar.open(
              "There is An Error. Please screenshot and report a bug. Error: " +
                error.statusText
            );
            reject(null);
          }
        );
    });
  }

  private getDate() {
    let today = new Date();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let second = today.getSeconds();
    return today
      .getFullYear()
      .toString()
      .concat((month < 10 ? "0".concat(month.toString()) : month).toString())
      .concat((date < 10 ? "0".concat(date.toString()) : date).toString())
      .concat((hour < 10 ? "0".concat(hour.toString()) : hour).toString())
      .concat((minute < 10 ? "0".concat(minute.toString()) : minute).toString())
      .concat(
        (second < 10 ? "0".concat(second.toString()) : second).toString()
      );
  }

  getFileName(fileName: any) {
    return this.getDate().concat("_".concat(fileName));
  }

  addFile(data: any) {
    this.newFile = data;
  }

  getFile() {
    return this.newFile;
  }
}
