import { Component, inject } from '@angular/core';
import { RecommendationService } from './data-access/recommendation.service';
import { AlertComponent } from '@shared/ui/alert/alert.component';
import { RecommendedDancerComponent } from './ui/recommended-dancer.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommendations',
  template: `
    <div>
      <h1 class="page-header">Diese Tänzer könnten für Sie interessant sein</h1>

      <ng-container
        *ngIf="recommendationsResponse$ | async as response; else loading"
      >
        <ng-container *ngIf="response.isSuccess; else error">
          <div class="recommended-dancers">
            <ng-container *ngFor="let recommendedDancer of response.payload">
              <app-recommended-dancer
                [dancer]="recommendedDancer"
                (click)="openPublicProfile(recommendedDancer.id)"
              ></app-recommended-dancer>
            </ng-container>
          </div>

          <div class="load-more">
            <button class="btn-lg btn-secondary">Weitere anzeigen</button>
          </div>
        </ng-container>
      </ng-container>

      <ng-template #loading>
        <div class="recommended-dancers">
          <div class="rounded border bg-gray-100">
            <div class="h-80 animate-pulse rounded-t bg-gray-400"></div>
            <div class="space-y-4 p-6">
              <div class="h-4 w-1/3 animate-pulse rounded bg-gray-400"></div>
              <div class="h-4 w-3/4 animate-pulse rounded bg-gray-300"></div>
            </div>
          </div>
          <div class="rounded border bg-gray-100">
            <div class="h-80 animate-pulse rounded-t bg-gray-400"></div>
            <div class="space-y-4 p-6">
              <div class="h-4 w-1/2 animate-pulse rounded bg-gray-400"></div>
              <div class="h-4 w-3/4 animate-pulse rounded bg-gray-300"></div>
            </div>
          </div>
        </div>
      </ng-template>

      <ng-template #error>
        <app-alert alertType="error" icon="error">
          <p>
            Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
          </p>
        </app-alert>
      </ng-template>
    </div>
  `,
  styleUrls: ['./recommendations.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, RecommendedDancerComponent, AlertComponent, AsyncPipe],
})
export class RecommendationsComponent {
  recommendationsService = inject(RecommendationService);
  router = inject(Router);
  recommendationsResponse$ = this.recommendationsService.getRecommendations$();

  constructor() {}

  openPublicProfile(dancerId: string): void {
    this.router.navigate(['profile', 'view', dancerId]);
  }
}
