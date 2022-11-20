import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NarrowPageComponent } from './narrow-page.component';

describe('NarrowPageComponent', () => {
  let component: NarrowPageComponent;
  let fixture: ComponentFixture<NarrowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NarrowPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NarrowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
