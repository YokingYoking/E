import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/product.model'
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-catalog-view',
  templateUrl: './catalog-view.component.html',
  styleUrls: ['./catalog-view.component.css']
})
export class CatalogViewComponent implements OnInit {

  categories?: Array<Category>;

  constructor(
    private productAPI: ProductService,

  ) { }

  ngOnInit(): void {
    this.productAPI.getCatalog().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories
      },
      error: () => {
        
      },
    })
  }

}
