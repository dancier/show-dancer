import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDanceTypeComponent } from './edit-dance-type.component';

describe('DanceTypeComponent', () => {
  let component: EditDanceTypeComponent;
  let fixture: ComponentFixture<EditDanceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDanceTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDanceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
