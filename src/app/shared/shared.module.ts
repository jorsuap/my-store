import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReversePipe } from '../shared/pipes/pipes/reverse.pipe';
import { TimeAgoPipe } from '../shared/pipes/pipes/time-ago.pipe';
import { ImgComponent } from '../shared/components/img/img.component';
import { HighLightDirective } from '../shared/directives/high-light.directive';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from '../shared/components/products/products.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    HighLightDirective,
    ImgComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports:[
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    HighLightDirective,
    ImgComponent,
  ]
})
export class SharedModule { }
