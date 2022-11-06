import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernLayoutComponent } from './modern-layout.component';

describe('ModernLayoutComponent', () => {
  let component: ModernLayoutComponent;
  let fixture: ComponentFixture<ModernLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModernLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModernLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
