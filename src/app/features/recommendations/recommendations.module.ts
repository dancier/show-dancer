import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecommendationsRoutingModule } from "./recommendations-routing.module";
import { SharedModule } from "@shared/shared.module";
import { RecommendationsOverviewComponent } from "./pages/recommendations-overview/recommendations-overview.component";
import { RecommendedDancerComponent } from "./components/recommended-dancer/recommended-dancer.component";

@NgModule({
  declarations: [RecommendationsOverviewComponent, RecommendedDancerComponent],
  imports: [CommonModule, SharedModule, RecommendationsRoutingModule],
})
export class RecommendationsModule {}
