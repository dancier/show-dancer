import { Component } from '@angular/core';
import { SendVerificationLinkFormComponent } from '../../reset-password/send-verification-link-form/send-verification-link-form.component';

@Component({
    selector: 'app-verification-error',
    templateUrl: './verification-error.component.html',
    styleUrls: ['./verification-error.component.scss'],
    standalone: true,
    imports: [SendVerificationLinkFormComponent],
})
export class VerificationErrorComponent {
  constructor() {}
}
