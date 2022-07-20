import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressumPageComponent } from './impressum-page.component';

describe('ImpressumPageComponent', () => {
  let component: ImpressumPageComponent;
  let fixture: ComponentFixture<ImpressumPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpressumPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
