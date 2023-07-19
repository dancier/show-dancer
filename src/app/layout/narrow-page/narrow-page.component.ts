import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-narrow-page',
    templateUrl: './narrow-page.component.html',
    styleUrls: ['./narrow-page.component.scss'],
    standalone: true,
    imports: [RouterOutlet],
})
export class NarrowPageComponent {
  constructor() {}
}
