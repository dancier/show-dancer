import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationRequiredComponent } from './verification-required.component';

describe('VerificationRequiredComponent', () => {
  let component: VerificationRequiredComponent;
  let fixture: ComponentFixture<VerificationRequiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationRequiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
