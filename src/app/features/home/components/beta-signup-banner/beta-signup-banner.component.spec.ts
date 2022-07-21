import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaSignupBannerComponent } from './beta-signup-banner.component';

describe('BetaSignupBannerComponent', () => {
  let component: BetaSignupBannerComponent;
  let fixture: ComponentFixture<BetaSignupBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetaSignupBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetaSignupBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
