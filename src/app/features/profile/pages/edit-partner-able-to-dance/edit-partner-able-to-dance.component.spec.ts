import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartnerAbleToDanceComponent } from './edit-partner-able-to-dance.component';

describe('EditPartnerAbleToDanceComponent', () => {
  let component: EditPartnerAbleToDanceComponent;
  let fixture: ComponentFixture<EditPartnerAbleToDanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPartnerAbleToDanceComponent ]
    })
    .compileComponents();
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
