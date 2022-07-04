import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterUserNameComponent } from './enter-user-name.component';

describe('EnterUserNameComponent', () => {
  let component: EnterUserNameComponent;
  let fixture: ComponentFixture<EnterUserNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterUserNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterUserNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
