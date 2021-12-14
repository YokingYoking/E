import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { InMemoryCache      } from '../models/in-memory-cache';
import { Product, Category  } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getCatalog(): Observable<Category[]> {
    const url = '/Catalog';
    if (InMemoryCache.hasCache(url)) return InMemoryCache.getCache<Category[]>(url).observable;
    return (new InMemoryCache(url, new Observable<Category[]>(subscriber => {
      this.http.get<Category[]>(url).subscribe(categories => {
        subscriber.next(categories);
        subscriber.complete();
      });
    }))).observable;
  }

  getCategoryById(id: number): Observable<Category> {
    return new Observable<Category>((subscriber) => {
      // Use getCatalog instead of direct API call to avoid differences
      // in implementation and requirements between Project C and E.
      this.getCatalog().subscribe((categories) => {
        const category = categories.find(c => c.id === id);
        if (category) {
          subscriber.next(category);
        } else {
          subscriber.error({ status: 404, statusText: 'NOT FOUND' });
        }
        subscriber.complete();
      });
    });
  }

  getProductById(id: string): Observable<Product> {
    const url = `/api/products/${id}`;
    if (InMemoryCache.hasCache(url)) return InMemoryCache.getCache<Product>(url).observable;
    return (new InMemoryCache(url, this.http.get<Product>(url))).observable;
  }

  getProductsByCategory(catId: number): Observable<Product[]> {
    const url = `/api/products/category/${catId}`;
    if (InMemoryCache.hasCache(url)) return InMemoryCache.getCache<Product[]>(url).observable;
    return (new InMemoryCache(url, new Observable<Product[]>(subscriber => {
      this.http.get<Product[]>(url).subscribe(products => {
        products.forEach(p => InMemoryCache.putCache(`/api/products/${p.id}`, of(p)));
        subscriber.next(products);
        subscriber.complete();
      });
    }))).observable;
  }
}