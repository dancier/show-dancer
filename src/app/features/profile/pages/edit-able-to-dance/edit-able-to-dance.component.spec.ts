import { EditAbleToDanceComponent } from './edit-able-to-dance.component';
import { MatIconModule } from '@angular/material/icon';
import { MockComponent, MockProvider } from 'ng-mocks';
import { EditDanceTypeComponent } from '@features/profile/components/edit-dance-type/edit-dance-type.component';
import { ProfileService } from '@features/profile/services/profile.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditAbleToDanceComponent', () => {
  let component: EditAbleToDanceComponent;
  let fixture: ComponentFixture<EditAbleToDanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditAbleToDanceComponent,
        MockComponent(EditDanceTypeComponent),
      ],
      providers: [MockProvider(ProfileService)],
      imports: [MatIconModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAbleToDanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
