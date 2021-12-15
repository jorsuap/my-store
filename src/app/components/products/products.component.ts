import { Component, OnInit } from '@angular/core';
import { Product, CreateProductDTO,UpdateProductDTO } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart:Product[] = [];
  total = 0;
  products :Product[] = [];
  showProductDetail = false;
  productChosen:Product = {
    id: '',
    title: '',
    price: 0,
    images:[],
    description: '',
    category: {
      id: '',
      name: ''
    }
  }

  limit = 10;
  offset = 0

  constructor(
    private storeService:StoreService, //inyectando el servicio para ser usado en un componente
    private productsService:ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts(this.limit,this.offset)// debemos suscribirnos para ontener los cambios async
    .subscribe(data =>{// es un evento asincrono por lo que se debe suscribir a los cambios, cuando llege los datos, los asignara
      this.products = data;
    })
  }

  onAddToShoppingCart(product:Product){
     this.storeService.addProduct(product);
     this.total = this.storeService.getotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id:string){
    this.productsService.getProduct(id)
    .subscribe(data=>{
      this.toggleProductDetail();
      console.log('product', data);
      this.productChosen = data;
    })
  }

  createNewProduct(){
    const product:CreateProductDTO = {
      title:'Nuevo Producto',
      description:'bla bla',
      images:['https://placeimg.com/640/480/any?random=$%7BMath.random()%7D'],
      price: 1000,
      categoryId:2
    }
    this.productsService.create(product)
    .subscribe(data =>{
      this.products.unshift(data)
    })
  }

  updateProduct(){
    const change:UpdateProductDTO  = {
      title:'nuevo Titulos',
    }
    const id = this.productChosen.id
    this.productsService.update(id, change)
    .subscribe(data=>{
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
      this.products[productIndex] = data
      this.productChosen = data
    })
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(()=>{
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
      this.products.splice(productIndex, 1)
      this.showProductDetail = false
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
