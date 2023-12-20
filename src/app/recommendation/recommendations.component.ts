import { Component, inject } from '@angular/core';
import { RecommendationService } from './data-access/recommendation.service';
import { AlertComponent } from '@shared/ui/alert/alert.component';
import { RecommendedDancerComponent } from './ui/recommended-dancer.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-recommendations',
  template: `
    <div>
      <ng-container *ngIf="visibleDancers$ | async as response; else loading">
        <ng-container *ngIf="response.isSuccess; else error">
          <ng-container *ngIf="response.payload.length > 0; else noDancers">
            <h1 class="page-header">
              Diese Tänzer könnten für Sie interessant sein
            </h1>
            <div class="recommended-dancers">
              <ng-container *ngFor="let recommendedDancer of response.payload">
                <app-recommended-dancer
                  [dancer]="recommendedDancer"
                  (click)="openPublicProfile(recommendedDancer.id)"
                ></app-recommended-dancer>
              </ng-container>
            </div>

            <div
              *ngIf="
                ((actualAmountOfDancers$ | async) || 0) >
                response.payload.length
              "
              class="load-more"
            >
              <button class="btn-lg btn-secondary" (click)="showMoreDancers()">
                Weitere anzeigen
              </button>
            </div>
          </ng-container>
        </ng-container>
      </ng-container>

      <ng-template #noDancers>
        <div class="mx-auto max-w-[550px] px-4 text-center md:px-10">
          <h1 class="page-header mb-16 ">Keine Empfehlungen verfügbar</h1>
          <div class="mb-12">
            <img src="assets/img/no-recommendations.svg" />
          </div>
          <p class="mb-6 text-2xl">
            Leider haben wir noch keine Tanzpartner, die wir dir hier empfehlen
            können.
          </p>
          <p>
            Sobald wir neue Empfehlungen für dich haben, wirst du von uns
            <b>per Mail benachrichtigt.</b>
          </p>
          <p>
            Neue Empfehlungen werden regelmäßig aktualisiert, z.B. wenn sich
            neue Tanzpartner aus deiner Umgebung bei uns registrieren.
          </p>
        </div>
      </ng-template>

      <ng-template #loading>
        <h1 class="page-header">
          Diese Tänzer könnten für Sie interessant sein
        </h1>
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
        <h1 class="page-header">Fehler bei der Abfrage der Empfehlungen</h1>
        <app-alert alertType="error" icon="error">
          <span>
            Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
          </span>
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
  actualAmountOfDancers$ = this.recommendationsResponse$.pipe(
    map((response) => {
      if (response.isSuccess) {
        return response.payload.length;
      }
      return 0;
    })
  );

  maxDancers = new BehaviorSubject<number>(10);
  visibleDancers$ = this.maxDancers.asObservable().pipe(
    switchMap(() => this.recommendationsResponse$),
    filter((response) => response.isSuccess),
    map((response) => {
      if (response.isSuccess) {
        const numOfDancers = Math.min(
          this.maxDancers.getValue(),
          response.payload.length
        );
        return {
          ...response,
          payload: response.payload.slice(0, numOfDancers),
        };
      }
      return response;
    })
  );

  constructor() {}

  openPublicProfile(dancerId: string): void {
    this.router.navigate(['profile', 'view', dancerId]);
  }

  showMoreDancers(): void {
    this.maxDancers.next(this.maxDancers.getValue() + 10);
  }
}
