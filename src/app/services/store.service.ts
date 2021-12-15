import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart:Product[] = [];

  private myCart = new BehaviorSubject<Product[]>([])//se usa el metodo Behaiviorsubjec para implementar el patron observable

  myCart$ = this.myCart.asObservable(); //observable

  constructor() { }

  addProduct(product:Product){
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);//transmitimos el estado de la lista de productos
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }

  getotal(){
    return this.myShoppingCart.reduce((sum, item)=> sum + item.price, 0)//calculamos el total de los productos agregados
  }
}
