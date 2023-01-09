import { HttpRequest } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  onLoadingChanged = new EventEmitter();

  request: any[] = [];

  constructor() {}

  onStart(request: HttpRequest<any>) {
    this.request.push(request);
    this.notify();
  }

  onFinish(request: HttpRequest<any>) {
    const index = this.request.indexOf(request);
    if (index !== -1) {
      this.request.splice(index, 1);
    }
    this.notify();
  }

  private notify(): void {
    this.onLoadingChanged.emit(this.request.length !== 0);
  }
}
