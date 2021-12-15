import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart.model';


@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  
  cart: CartItem[] = [];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    
  }

  goBack() {
    history.go(-1);
  }

  go2Checkout() {
    if(this.cart.length === 0) {
      alert('nothing in the cart')
    } else {
      this.router.navigate(['/checkout']);
    }
  }

  cartUpdate(cart: CartItem[]) {
    this.cart = cart;
  }

  
}
