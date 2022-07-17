import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SignupType } from '@features/home/types/signup.type';

@Component({
  selector: 'app-beta-signup-type-selector',
  templateUrl: './beta-signup-type-selector.component.html',
  styleUrls: ['./beta-signup-type-selector.component.scss']
})
export class BetaSignupTypeSelectorComponent implements OnInit {

  @Input() type: SignupType = 'customer';

  @Output() typeChange = new EventEmitter<SignupType>();

  constructor() { }

  ngOnInit(): void {
  }

  changeType(type: SignupType): void {
    this.type = type;
    this.typeChange.emit(type);
  }

}
