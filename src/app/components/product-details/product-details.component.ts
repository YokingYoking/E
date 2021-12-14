import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  inputs: ['product']
})
export class ProductDetailsComponent implements OnInit {

  @Input()
  product!: Product;
  constructor() { }

  ngOnInit(): void {
  }

}
