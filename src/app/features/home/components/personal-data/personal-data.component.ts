import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent {

  @Input() username: String = '';
  @Input() height: String = '';
  @Input() birthday: String = '';
  @Input() gender: String = '';
  @Input() email: String = '';
  @Input() city: String = '';
  @Input() country: String = "";
  @Input() zipCode: String = "";

  constructor() {
  }

}
