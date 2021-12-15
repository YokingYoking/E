import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormControl,ValidatorFn } from '@angular/forms';
import { ShippingConstants,Province } from 'src/app/models/shipping.nodel';
import { Title } from '@angular/platform-browser';
import { ShippingService } from 'src/app/services/shipping.service';

@Component({
  selector: 'app-ship-to-view',
  templateUrl: './ship-to-view.component.html',
  styleUrls: ['./ship-to-view.component.css']
})
export class ShipToViewComponent implements OnInit {

  shippingAddress = this.fb.group({
    recipient:      ['', Validators.required],
    streetAddress:  ['', Validators.required],
    streetAddress2: [''],
    city:           ['',   Validators.required],
    province:       [null, Validators.required],
    postalCode:     ['',  [Validators.required, this.validatePostalOrZipCode.bind(this)]],
    delivery:       ['Standard']
  });

  PostalCodeRegEx = /^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$/i;
  ZipCodeRegEx    = /^[0-9]{5}(?:[-\s][0-9]{4})?$/;

  CanadianProvincesAndTerritories = ShippingConstants.CanadianProvincesAndTerritories;
  USStatesAndTerritories = ShippingConstants.USStatesAndTerritories;
  DeliveryMethods = ShippingConstants.DeliveryMethods;

  constructor(
    private fb: FormBuilder,
    private shipping: ShippingService,
    private title: Title,
    private formSubmitted: Boolean,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Ship To');
    if (this.shipping.shippingAddress) {
      this.shippingAddress.setValue(this.shipping.shippingAddress);
    }
    this.shippingAddress.get('province')!.valueChanges.subscribe((province?: Province) => {
      const postalCode = this.shippingAddress.get('postalCode')!;
      const validator  = this.getPostalCodeValidator(province);
      postalCode.setValidators([Validators.required, validator]);
      postalCode.updateValueAndValidity();
    });
    
    
  }
  goBack() {
    history.go(-1);
  }
  invalidInput(input: string): boolean {
    if (this.formSubmitted) { // boolean set to true when the submit is clicked
      return this.shippingAddress.get(input)!.invalid;
    } else {
      return false;
    }
  }
  
  validInput(input: string): boolean {
    if (this.shippingAddress.touched || this.shippingAddress.dirty) {
      return this.shippingAddress.get(input)!.valid;
    } else {
      return false;
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.shippingAddress.valid) {
      this.shipping.shippingAddress = this.shippingAddress.value; // Here
      this.goBack();
    }
  }

  validatePostalOrZipCode(fc: FormControl) {
    return (this.PostalCodeRegEx.test(fc.value) || this.ZipCodeRegEx.test(fc.value)) ? null : {
      validInput: {
        valid: false
      }
    };
  }

  getPostalCodeValidator(province?: Province) {
    if (!province) {
      return this.validatePostalOrZipCode.bind(this) as ValidatorFn;
    }
    return this.CanadianProvincesAndTerritories.includes(province)
        ? Validators.pattern(this.PostalCodeRegEx)
        : Validators.pattern(this.ZipCodeRegEx);
  }
}
