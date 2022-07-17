import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaSignupFormComponent } from './beta-signup-form.component';

describe('BetaSignupFormComponent', () => {
  let component: BetaSignupFormComponent;
  let fixture: ComponentFixture<BetaSignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetaSignupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetaSignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
