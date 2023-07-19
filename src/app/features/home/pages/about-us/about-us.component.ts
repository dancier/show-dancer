import { Component } from '@angular/core';
import { DataTestDirective } from '../../../../shared/directives/data-test.directive';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss'],
    standalone: true,
    imports: [DataTestDirective],
})
export class AboutUsComponent {
  constructor() {}
}
