import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDataFormComponent } from './personal-data-form.component';

describe('PersonalDataFormComponent', () => {
  let component: PersonalDataFormComponent;
  let fixture: ComponentFixture<PersonalDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalDataFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
