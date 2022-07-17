import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SignupType } from '@features/home/types/signup.type';

@Component({
  selector: 'app-beta-signup-type-selector',
  templateUrl: './beta-signup-type-selector.component.html',
  styleUrls: ['./beta-signup-type-selector.component.scss']
})
export class BetaSignupTypeSelectorComponent {

  @Input() type: SignupType | undefined;

  @Output() typeChange = new EventEmitter<SignupType>();

  constructor() { }

  changeType(type: SignupType): void {
    this.type = type;
    this.typeChange.emit(type);
  }

  onTypeSelect(type: SignupType): void {
    this.changeType(type);
  }
}
