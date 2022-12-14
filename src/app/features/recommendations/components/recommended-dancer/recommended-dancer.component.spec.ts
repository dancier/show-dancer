import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RecommendedDancerComponent } from "./recommended-dancer.component";

describe('RecommendedDancerComponent', () => {
  let component: RecommendedDancerComponent;
  let fixture: ComponentFixture<RecommendedDancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedDancerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedDancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
