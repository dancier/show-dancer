import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordEmailVerificationComponent } from './reset-password-email-verification.component';

describe('ResetPasswordEmailVerificationComponent', () => {
  let component: ResetPasswordEmailVerificationComponent;
  let fixture: ComponentFixture<ResetPasswordEmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetPasswordEmailVerificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
