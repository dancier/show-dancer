import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorRegistrationSuccessComponent } from './contributor-registration-success.component';

describe('ContributorRegistrationSuccessComponent', () => {
  let component: ContributorRegistrationSuccessComponent;
  let fixture: ComponentFixture<ContributorRegistrationSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributorRegistrationSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorRegistrationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
