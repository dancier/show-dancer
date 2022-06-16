import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAbleToDance } from './edit-able-to-dance.component';

describe('AddAbleToDanceComponent', () => {
  let component: EditAbleToDance;
  let fixture: ComponentFixture<EditAbleToDance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAbleToDance ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAbleToDance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
