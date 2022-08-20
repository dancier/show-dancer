import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDanceTypeComponent } from './edit-dance-type.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('DanceTypeComponent', () => {
  let component: EditDanceTypeComponent;
  let fixture: ComponentFixture<EditDanceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDanceTypeComponent ],
      imports: [
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatOptionModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatSelectModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ]
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
