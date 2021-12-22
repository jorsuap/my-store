import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { NavComponent } from './components/nav/nav.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighLightDirective } from './directives/high-light.directive';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { TimeInterceptor } from './interceptor/time.interceptor';
import { TokenInterceptor } from './interceptor/token/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    NavComponent,
    ReversePipe,
    TimeAgoPipe,
    HighLightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SwiperModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi:true },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
