import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
} from "@angular/common/http";
import { finalize, map, Observable } from "rxjs";
import { LoadingService } from "../services/loading.service";
import { TemplateService } from "../services/template.service";
import jwt_decode from "jwt-decode";
import { URL_PREFIX } from "src/app/app.component.constant";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    protected loadingService: LoadingService,
    protected templateService: TemplateService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url.startsWith(URL_PREFIX) &&
      sessionStorage.getItem("authorization")
    ) {
      request = request.clone({
        headers: new HttpHeaders({
          Authorization: sessionStorage.getItem("authorization") as any,
        }),
      });
    }
    this.loadingService.onStart(request);
    return next.handle(request).pipe(
      map((event: any) => {
        if (
          request.url.startsWith(URL_PREFIX) &&
          event instanceof HttpResponse &&
          event.headers.get("Authorization")
        ) {
          sessionStorage.setItem(
            "authorization",
            event.headers.get("Authorization") as any
          );
          let decodeAuthorization: any = jwt_decode(
            event.headers.get("Authorization") as any
          );
          this.templateService.setUser(decodeAuthorization.username);
          this.templateService.setRole(decodeAuthorization.role);
        }
        return event;
      }),
      finalize(() => {
        this.loadingService.onFinish(request);
      })
    );
  }
}
