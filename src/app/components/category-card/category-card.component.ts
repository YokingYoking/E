import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/product.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css'],
  inputs: ['category']
})
export class CategoryCardComponent implements OnInit {
  @Input()
  category!: Category;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
