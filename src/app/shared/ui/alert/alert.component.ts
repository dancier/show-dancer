import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [MatIconModule],
})
export class AlertComponent {
  @Input() alertType: 'warning' | 'error' = 'warning';
  @Input() icon = 'person';

  constructor() {}
}
