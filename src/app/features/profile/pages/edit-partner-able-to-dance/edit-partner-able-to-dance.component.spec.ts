import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartnerAbleToDanceComponent } from './edit-partner-able-to-dance.component';
import { MockProvider } from 'ng-mocks';
import { ProfileService } from '@features/profile/services/profile.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditPartnerAbleToDanceComponent', () => {
  let component: EditPartnerAbleToDanceComponent;
  let fixture: ComponentFixture<EditPartnerAbleToDanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPartnerAbleToDanceComponent],
      providers: [MockProvider(ProfileService)],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartnerAbleToDanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
