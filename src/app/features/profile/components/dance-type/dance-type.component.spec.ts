import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanceTypeComponent } from './dance-type.component';

describe('DanceTypeComponent', () => {
  let component: DanceTypeComponent;
  let fixture: ComponentFixture<DanceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanceTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
