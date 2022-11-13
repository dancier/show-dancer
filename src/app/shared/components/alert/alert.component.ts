import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() alertType: 'warning' | 'error' = 'warning';
  @Input() icon = 'person';

  constructor() {}
}
