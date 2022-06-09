import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonalDataComponent } from './edit-personal-data.component';

describe('EditPersonalDataComponent', () => {
  let component: EditPersonalDataComponent;
  let fixture: ComponentFixture<EditPersonalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPersonalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
