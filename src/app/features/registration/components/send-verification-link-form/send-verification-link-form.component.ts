import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-send-verification-link-form',
  templateUrl: './send-verification-link-form.component.html',
  styleUrls: ['./send-verification-link-form.component.scss'],
})
export class SendVerificationLinkFormComponent {
  @Input() submitText?: string;
  submitButtonText?: string;
  constructor() {}

  submitForm(): void {
    // TODO: does "acceptTermsAndConditions" stay in the API?
    // adding it for now so registration can work again...
  }
}
