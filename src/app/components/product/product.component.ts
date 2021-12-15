import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product:Product = {
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

  @Output() addedProduct = new EventEmitter<Product>();// exportar al padre
  @Output() showProduct = new EventEmitter<string>();

  constructor() { }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {

  }


  onAddtoCart(){
    this.addedProduct.emit(this.product)
  }

  onShowDetail(){
    this.showProduct.emit(this.product.id)
  }

}
