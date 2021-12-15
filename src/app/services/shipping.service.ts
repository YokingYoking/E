import { Injectable } from '@angular/core';
import { Shipping } from '../models/shipping.nodel';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  shippingAddress?: Shipping;
}