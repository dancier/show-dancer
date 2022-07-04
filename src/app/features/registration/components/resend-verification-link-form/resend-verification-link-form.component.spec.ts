import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendVerificationLinkFormComponent } from './resend-verification-link-form.component';

describe('ResendVerificationLinkFormComponent', () => {
  let component: ResendVerificationLinkFormComponent;
  let fixture: ComponentFixture<ResendVerificationLinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResendVerificationLinkFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendVerificationLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
