import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { finalize, map, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(protected loadingService: LoadingService) {}

  private authorization: any;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authorization) {
      request = request.clone({
        headers: new HttpHeaders({ Authorization: this.authorization }),
      });
    }
    this.loadingService.onStart(request);
    return next.handle(request).pipe(
      map((event: any) => {
        if (event instanceof HttpResponse) {
          if (event.headers.get('Authorization'))
            this.authorization = event.headers.get('Authorization');
        }
        return event;
      }),
      finalize(() => {
        this.loadingService.onFinish(request);
      })
    );
  }
}
