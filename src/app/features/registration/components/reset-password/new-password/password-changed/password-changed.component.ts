import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-password-changed',
    templateUrl: './password-changed.component.html',
    styleUrls: ['./password-changed.component.scss'],
    standalone: true,
    imports: [MatButtonModule, RouterLink],
})
export class PasswordChangedComponent {
  constructor() {}
}
