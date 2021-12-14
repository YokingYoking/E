import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Category, Product } from '../../models/product.model'
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {

  category?: Category;
  product?: Product;
  selected!: Product;
  products?: Array<Product>;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private productAPI: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('catId')) {
        this.productAPI.getCategoryById(+params.get('catId')!).subscribe({
          next: (category) => {
            this.category = category
            this.title.setTitle(this.selected ? this.selected.name : category.name)
          },
          error: () => {
            this.router.navigate(['/']);
          }
        });
        this.productAPI.getProductsByCategory(+params.get('catId')!).subscribe({
          next: (products) => {
            this.products = products
          },
          error: () => {
            this.router.navigate(['/']);
          }
        });
      } else if (params.has('prodId')) {
        this.productAPI.getProductById(params.get('prodId')!).subscribe({
          next: (product) => {
            this.product = product
            this.selected = product
          },
          error: () => {
            this.router.navigate(['/']);
          }
        }); // assign product to this.selected
      } else {
        this.router.navigate(['/']);
      }
    });
  }

}
