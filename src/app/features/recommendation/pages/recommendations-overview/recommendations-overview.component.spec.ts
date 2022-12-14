import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RecommendationsOverviewComponent } from "./recommendations-overview.component";

describe('RecommendationsOverviewComponent', () => {
  let component: RecommendationsOverviewComponent;
  let fixture: ComponentFixture<RecommendationsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecommendationsOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendationsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
