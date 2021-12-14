import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Title } from '@angular/platform-browser';

import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  inputs: ['product']
})
export class ProductDetailsComponent implements OnInit {

  @Input()
  product!: Product;
  constructor(
    private title: Title,
    private cartAPI: CartService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Product Details');
  }

  add2Cart(product: Product) {
    this.cartAPI.addToCart(product).subscribe({
      next: () =>{
        console.log('add success')
      },
      error: () => {

      }
    })
  }

}
