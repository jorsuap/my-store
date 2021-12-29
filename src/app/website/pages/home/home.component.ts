import { Component, OnInit, Output } from '@angular/core';
import { ProductsComponent } from '../../../shared/components/products/products.component';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products:Product[] = [];
  limit = 10;
  offset = 0;
  productId:string | null = null;

  constructor(
    private productsService:ProductsService,
    private router:ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.loadData()
  }

  public loadData(){
    this.productsService.getAllProducts(this.limit,this.offset)// debemos suscribirnos para ontener los cambios async
    .subscribe(data =>{// es un evento asincrono por lo que se debe suscribir a los cambios, cuando llege los datos, los asignara
      this.products = data;
      this.offset += this.limit;
    });
    this.router.queryParamMap.subscribe(params =>{
      this.productId = params.get('product')
      console.log(this.productId)
    })
  }

  loadMore(){
      this.productsService.getProductsByPage(this.limit,this.offset)// debemos suscribirnos para ontener los cambios async
      .subscribe(data =>{// es un evento asincrono por lo que se debe suscribir a los cambios, cuando llege los datos, los asignara
        this.products = this.products.concat(data);
        this.offset += this.limit
      })
  }
}
