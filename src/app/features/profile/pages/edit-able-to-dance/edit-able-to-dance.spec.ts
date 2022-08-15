import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAbleToDanceComponent } from './edit-able-to-dance.component';
import { MatIconModule } from '@angular/material/icon';

describe('AddAbleToDanceComponent', () => {
  let component: EditAbleToDanceComponent;
  let fixture: ComponentFixture<EditAbleToDanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAbleToDanceComponent ],
      imports: [
        MatIconModule,
      ]
    })
    .compileComponents();
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
