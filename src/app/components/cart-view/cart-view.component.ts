import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  items?: Array<CartItem>;

  constructor(
    private cartAPI: CartService,
  ) { }

  ngOnInit(): void {
    this.cartAPI.getCart().subscribe({
      next: (items) => {
        this.items = items
      },
      error: () => {

      }
    })
  }

  qtyAsNumber(item: CartItem) {
    item.qty = item.qty ? +item.qty : 0;
  }

  updateCart(item: CartItem) {
    this.cartAPI.updateCart(item, item.qty).subscribe({
      next: () => {

      },
      error: () => {

      },
    }
      
    )
  }

  goBack() {
    
  }
}