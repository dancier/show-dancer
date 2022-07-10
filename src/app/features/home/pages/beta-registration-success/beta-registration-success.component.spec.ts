import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaRegistrationSuccessComponent } from './beta-registration-success.component';

describe('BetaRegistrationSuccessComponent', () => {
  let component: BetaRegistrationSuccessComponent;
  let fixture: ComponentFixture<BetaRegistrationSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetaRegistrationSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetaRegistrationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
