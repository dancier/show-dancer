import { Component } from '@angular/core';
import { AuthenticationService } from '@core/auth/services/authentication.service';
import { APIResponse } from '@shared/http/response.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  constructor(private authenticationService: AuthenticationService) {}
}
