import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dance-type',
  templateUrl: './dance-type.component.html',
  styleUrls: ['./dance-type.component.scss']
})
export class DanceTypeComponent {

  @Input() danceTypeName: String = '';
  @Input() danceLevel: String = '';
  @Input() role: String = "";

  constructor() {
  }
}
