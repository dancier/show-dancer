import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, map, switchMap } from 'rxjs';
import { AlertComponent } from '@shared/ui/alert/alert.component';
import { RecommendationService } from './data-access/recommendation.service';
import { RecommendedDancerComponent } from './ui/recommended-dancer.component';

@Component({
  selector: 'app-recommendations',
  imports: [CommonModule, RecommendedDancerComponent, AlertComponent],
  template: `
    <div class="my-12 mx-auto max-w-[1200px] px-4 md:px-10 lg:px-10">
      @if (visibleDancers$ | async; as response) {
        @if (response.isSuccess) {
          @if (response.payload.length > 0) {
            <h1 class="page-header mb-10">
              Diese Tänzer könnten für Sie interessant sein
            </h1>
            <div class="">
              @for (
                recommendedDancer of response.payload;
                track recommendedDancer.id
              ) {
                <div class="mb-10">
                  <app-recommended-dancer
                    [dancer]="recommendedDancer"
                    (click)="openPublicProfile(recommendedDancer.id)"
                  ></app-recommended-dancer>
                </div>
              }
            </div>

            @if (
              ((actualAmountOfDancers$ | async) || 0) > response.payload.length
            ) {
              <div class="flex items-center justify-center">
                <button
                  class="btn-lg btn-secondary"
                  (click)="showMoreDancers()"
                >
                  Weitere anzeigen
                </button>
              </div>
            }
          } @else {
            <div class="mx-auto max-w-[550px] px-4 text-center md:px-10">
              <h1 class="page-header mb-16 ">Keine Empfehlungen verfügbar</h1>
              <div class="mb-12">
                <img src="assets/img/no-recommendations.svg" />
              </div>
              <p class="mb-6 text-2xl">
                Leider haben wir noch keine Tanzpartner, die wir dir hier
                empfehlen können.
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
          }
        } @else {
          <h1 class="page-header">Fehler bei der Abfrage der Empfehlungen</h1>
          <app-alert alertType="error" icon="error">
            <span>
              Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später
              erneut.
            </span>
          </app-alert>
        }
      } @else {
        <h1 class="page-header mb-10">
          Diese Tänzer könnten für Sie interessant sein
        </h1>
        <div class="recommended-dancers flex flex-col gap-10">
          <div class="rounded border bg-gray-100">
            <div class="h-60 animate-pulse rounded-t bg-gray-400"></div>
          </div>
          <div class="rounded border bg-gray-100">
            <div class="h-60 animate-pulse rounded-t bg-gray-400"></div>
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
