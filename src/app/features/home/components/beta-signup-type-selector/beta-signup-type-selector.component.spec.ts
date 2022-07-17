import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaSignupTypeSelectorComponent } from './beta-signup-type-selector.component';

describe('BetaSignupTypeSelectorComponent', () => {
  let component: BetaSignupTypeSelectorComponent;
  let fixture: ComponentFixture<BetaSignupTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetaSignupTypeSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetaSignupTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
