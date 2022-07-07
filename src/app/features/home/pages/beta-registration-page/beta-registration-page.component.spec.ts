import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaRegistrationPageComponent } from './beta-registration-page.component';

describe('BetaRegistrationPageComponent', () => {
  let component: BetaRegistrationPageComponent;
  let fixture: ComponentFixture<BetaRegistrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetaRegistrationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetaRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
