import { Component, OnInit,Input, inject, Inject } from '@angular/core';
import { CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css']
})
export class CartTableComponent implements OnInit {

  @Input() updatable: boolean = false;
  items: CartItem[] = [];
  total: number = 0;

  constructor(
    private cartAPI: CartService,
    private title: Title,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Cart');
    this.cartAPI.getCart().subscribe({
      next: (items) => {
        this.items = items
        for(let i = 0;i < items.length;i++) {
          this.total += items[i].product!.cost * items[i].qty
        }
        
      },
      error: () => {

      }
    })
  }
  qtyAsNumber(item: CartItem) {
    item.qty = +item.qty;
  }
  
  updateCart(item: CartItem) {
    this.cartAPI.updateCart(item).subscribe((items) => {
      alert('Cart Updated');
      this.items = items.map((updated) => {
        const it = this.items.find(it => updated.id === it.id);
        updated.product = it!.product;
        return updated;
      });
    });
  }
}
