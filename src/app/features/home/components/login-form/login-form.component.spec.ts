import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports: [ ReactiveFormsModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an email field', () => {
    const emailField = fixture.nativeElement.querySelector('[data-test="email-field"]');
    expect(emailField).toBeTruthy();
  });

  it('should display a password field', () => {
    const passwordField = fixture.nativeElement.querySelector('[data-test="password-field"]');
    expect(passwordField).toBeTruthy();
  });

  it('should display a submit button', () => {
    const submitButton = fixture.nativeElement.querySelector('[data-test="submit-login"]');
    expect(submitButton).toBeTruthy();
  });

  describe('the user enters existing user credentials and submits the form', () => {

    beforeEach(() => {

    });

  });

  xdescribe('the user enters non-existing user credentials and submits the form', () => {

  });
});
