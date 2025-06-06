import { Component } from '@angular/core';
import { SendVerificationLinkFormComponent } from '../../ui/send-verification-link-form/send-verification-link-form.component';
import { DataTestDirective } from '@shared/util/data-test.directive';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  imports: [DataTestDirective, SendVerificationLinkFormComponent],
})
export class ResetPasswordComponent {}
