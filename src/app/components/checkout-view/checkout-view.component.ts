import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ShippingService } from 'src/app/services/shipping.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-view',
  templateUrl: './checkout-view.component.html',
  styleUrls: ['./checkout-view.component.css']
})
export class CheckoutViewComponent implements OnInit {

  

  constructor(
    private location: Location,
    private title: Title,
    private router: Router,
    private shipping: ShippingService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Checkout');
    if (!this.shipping.shippingAddress) {
    this.router.navigate(['/shipTo'], { replaceUrl: true });
  }
  }

  get shippingAddress() {
    return this.shipping.shippingAddress;
  }

  goBack() {
    history.go(-1);
  }

  go2Catalog() {
    this.router.navigate(['/catalog']);
  }

  goHome() {
    this.router.navigate(['/']);
  }

}
