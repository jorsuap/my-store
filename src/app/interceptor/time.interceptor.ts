import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const CHECK_TIME = new HttpContextToken<boolean>(()=> false)

export function checkTime(){
  return new HttpContext().set(CHECK_TIME, true)
}

@Injectable()//se debe injectar de forma manual en el app module
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.context.get(CHECK_TIME)){
      const start = performance.now();//utilidad del navegador
      return next
      .handle(request)
      .pipe(
        tap(()=>{//proceso sin cambiar la respuesta del observable
          const time = (performance.now() - start)+ 'ms';
          console.log(request.url, time)
        })
      )
    }
    return next
      .handle(request)
  }
}
