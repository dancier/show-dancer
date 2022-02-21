import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
      ],
      declarations: [RegistrationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
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
    const emailField = fixture.nativeElement.querySelector('[data-test="email-field"]');
    const passwordField = fixture.nativeElement.querySelector('[data-test="password-field"]');
    expect(emailField).toBeTruthy();
    expect(passwordField).toBeTruthy();
  });

  // TODO: add more tests for registration

});
