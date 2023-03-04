import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterUserFormComponent } from './register-user-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RecaptchaModule } from 'ng-recaptcha';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterUserFormComponent', () => {
  let component: RegisterUserFormComponent;
  let fixture: ComponentFixture<RegisterUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        MatCardModule,
        MatFormFieldModule,
        MatCheckboxModule,
        RecaptchaModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [RegisterUserFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const title = fixture.nativeElement.querySelector('[data-test="title"]');
    expect(title).toBeTruthy();
  });

  it('should have an email and password field', () => {
    const emailField = fixture.nativeElement.querySelector(
      '[data-test="email-field"]'
    );
    const passwordField = fixture.nativeElement.querySelector(
      '[data-test="password-field"]'
    );
    expect(emailField).toBeTruthy();
    expect(passwordField).toBeTruthy();
  });

  // TODO: add more tests
});
