import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-datail',
  templateUrl: './product-datail.component.html',
  styleUrls: ['./product-datail.component.scss']
})
export class ProductDatailComponent implements OnInit {

  productyId: string | null = null;
  product: Product | null =  null;

  constructor(
    private route:ActivatedRoute,
    private productsService:ProductsService,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params =>{
        this.productyId = params.get('id');
        if(this.productyId){
          return this.productsService.getProduct(this.productyId)
        }
        return [];
      })
    )
    .subscribe((data) => {
      this.product = data;
    });
  }
  goToBack(){
    this.location.back()//metodo para regresar a la pagina anterior
  }
}
