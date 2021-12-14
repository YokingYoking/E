import { NgModule             } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule     } from '@angular/common/http';
import { RouterModule         } from '@angular/router';
import { FormsModule          } from '@angular/forms';

import { AppComponent            } from './app.component';
import { NavbarComponent         } from './components/navbar/navbar.component';
import { CatalogViewComponent    } from './components/catalog-view/catalog-view.component';
import { CategoryCardComponent   } from './components/category-card/category-card.component';
import { CategoryViewComponent   } from './components/category-view/category-view.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartViewComponent       } from './components/cart-view/cart-view.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, // template-driven forms
    RouterModule.forRoot([
      { path: 'catalog',          component: CatalogViewComponent },
      { path: 'category/:catId',  component: CategoryViewComponent },
      { path: 'products/:prodId', component: CategoryViewComponent },
      { path: 'cart',             component: CartViewComponent },
      { path: '',   pathMatch: 'full', redirectTo: '/catalog' },
      { path: '**', pathMatch: 'full', redirectTo: '/catalog' },
    ])
  ],
  bootstrap: [AppComponent],
  providers: [
    Title
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    CatalogViewComponent,
    CategoryCardComponent,
    CategoryViewComponent,
    ProductDetailsComponent,
    CartViewComponent
  ]
})
export class AppModule { }