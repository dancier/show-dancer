import { Component, Input } from '@angular/core';
import { Profile } from '../../types/profile.types';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent {

  @Input() profile?: Profile

  constructor() {
  }

}
