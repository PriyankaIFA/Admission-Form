import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mobile-number',
  templateUrl: './mobile-number.component.html',
  styleUrls: ['./mobile-number.component.css']
})
export class MobileNumberComponent {
  mobileNumberForm: FormGroup;
  mobileNumberFormControl: FormControl;

  constructor() {
    this.mobileNumberFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/)
    ]);
    this.mobileNumberForm = new FormGroup({
      mobileNumber: this.mobileNumberFormControl
    });

    this.mobileNumberFormControl.valueChanges.subscribe(value => {
      if (value && value.length > 10) {
        this.mobileNumberFormControl.setValue(value.substr(0, 10), { emitEvent: false });
      }
    });
  }
}
