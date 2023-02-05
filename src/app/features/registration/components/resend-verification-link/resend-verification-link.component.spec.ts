import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendVerificationLinkComponent } from './resend-verification-link.component';

describe('ResendVerificationLinkComponent', () => {
  let component: ResendVerificationLinkComponent;
  let fixture: ComponentFixture<ResendVerificationLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResendVerificationLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResendVerificationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
