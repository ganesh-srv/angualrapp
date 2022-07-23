import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';
@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {

  private readonly requests: HttpRequest<any>[] = [];

  constructor(private readonly loaderService: SpinnerService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    if(!req.url.includes('trace')){
      this.loaderService.isLoading.next(false);
    }

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.requests.push(req);


    this.loaderService.isLoading.next(true);
    return Observable.create((observer: { next: (arg0: HttpResponse<any>) => void; error: (arg0: any) => void; complete: () => void; }) => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => {
            this.removeRequest(req);
            observer.error(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}





