import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitPartnerDanceExperienceComponent } from './init-partner-dance-experience.component';
import { MockProvider } from 'ng-mocks';
import { ProfileService } from '../../../services/profile.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditPartnerAbleToDanceComponent', () => {
  let component: InitPartnerDanceExperienceComponent;
  let fixture: ComponentFixture<InitPartnerDanceExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitPartnerDanceExperienceComponent],
      providers: [MockProvider(ProfileService)],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitPartnerDanceExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
