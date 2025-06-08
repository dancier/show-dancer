import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DancersHttpService } from '../data-access/dancers-http.service';
import { Dancer } from '../data-access/types/dancer.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-dancers',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="my-12 mx-auto max-w-[1200px] px-4 md:px-10 lg:px-10">
      <h1 class="page-header mb-10">Tänzer finden</h1>

      <!-- Responsive Grid Container -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <!-- Filters Sidebar -->
        <div class="md:col-span-1 order-1 md:order-1">
          <div class="md:sticky md:top-8 space-y-6">
            <div
              class="bg-white shadow-sm border border-gray-200 rounded-lg p-6"
            >
              <form class="space-y-6" [formGroup]="filtersForm">
                <!-- Gender Filter -->
                <fieldset>
                  <legend class="block text-sm font-medium text-gray-700 mb-3">
                    Geschlecht
                  </legend>
                  <div data-testid="gender-filter" class="flex flex-wrap gap-3">
                    <label class="relative cursor-pointer">
                      <input
                        type="radio"
                        value="ALL"
                        formControlName="gender"
                        class="sr-only peer"
                        data-testid="gender-filter-all"
                      />
                      <div
                        class="px-4 py-2 text-sm font-medium rounded-lg border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all peer-checked:bg-rose-600 peer-checked:border-rose-600 peer-checked:text-white text-center"
                      >
                        Alle
                      </div>
                    </label>

                    <label class="relative cursor-pointer">
                      <input
                        type="radio"
                        value="MALE"
                        formControlName="gender"
                        class="sr-only peer"
                        data-testid="gender-filter-male"
                      />
                      <div
                        class="px-4 py-2 text-sm font-medium rounded-lg border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all peer-checked:bg-rose-600 peer-checked:border-rose-600 peer-checked:text-white text-center"
                      >
                        Männlich
                      </div>
                    </label>

                    <label class="relative cursor-pointer">
                      <input
                        type="radio"
                        value="FEMALE"
                        formControlName="gender"
                        class="sr-only peer"
                        data-testid="gender-filter-female"
                      />
                      <div
                        class="px-4 py-2 text-sm font-medium rounded-lg border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all peer-checked:bg-rose-600 peer-checked:border-rose-600 peer-checked:text-white text-center"
                      >
                        Weiblich
                      </div>
                    </label>
                  </div>
                </fieldset>

                <!-- Distance Filter -->
                <div>
                  <label
                    for="distance-filter"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Entfernung: {{ filtersForm.get('distance')?.value }} km
                  </label>
                  <div data-testid="distance-filter" class="relative">
                    <input
                      id="distance-filter"
                      data-testid="distance-slider"
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      formControlName="distance"
                      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div
                      class="flex justify-between text-xs text-gray-500 mt-1"
                    >
                      <span>5 km</span>
                      <span>100 km</span>
                    </div>
                  </div>
                </div>

                <!-- Apply Button -->
                <div>
                  <button
                    type="button"
                    data-testid="apply-filters-button"
                    class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                    (click)="applyFilters()"
                  >
                    Filter anwenden
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Results Section -->
        <div class="md:col-span-2 order-2 md:order-2">
          <div data-testid="dancer-list" class="space-y-6">
            @if (showResults()) {
              <!-- Loading State -->
              @if (isLoading()) {
                <div data-testid="find-loading-state" class="text-center py-8">
                  <div
                    class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"
                  ></div>
                  <p class="mt-2 text-sm text-gray-500">
                    Tänzer werden geladen...
                  </p>
                </div>
              }

              <!-- Results -->
              @if (!isLoading() && !hasError() && dancers().length > 0) {
                <div class="space-y-4">
                  @for (dancer of dancers(); track dancer.id) {
                    <div
                      data-testid="dancer-card"
                      class="bg-white shadow-sm border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                      tabindex="0"
                      role="button"
                      [attr.data-dancer-id]="dancer.id"
                      [attr.aria-label]="
                        'Profil von ' + dancer.dancerName + ' anzeigen'
                      "
                      (click)="viewProfile(dancer.id)"
                      (keydown.enter)="viewProfile(dancer.id)"
                      (keydown.space)="viewProfile(dancer.id)"
                    >
                      <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0">
                          <div
                            class="h-16 w-16 bg-gray-300 rounded-full flex items-center justify-center"
                          >
                            <span class="text-gray-600 text-sm font-medium">
                              {{ dancer.dancerName.charAt(0).toUpperCase() }}
                            </span>
                          </div>
                        </div>
                        <div class="flex-1 min-w-0">
                          <h3
                            data-testid="dancer-name"
                            class="text-lg font-medium text-gray-900"
                          >
                            {{ dancer.dancerName }}
                          </h3>
                          <p
                            data-testid="dancer-age"
                            class="text-sm text-gray-500"
                          >
                            {{ dancer.age }} Jahre
                          </p>
                          <p
                            data-testid="dancer-location"
                            class="text-sm text-gray-500"
                          >
                            {{ dancer.city }}, {{ dancer.country }}
                          </p>
                          @if (dancer.aboutMe) {
                            <p class="mt-2 text-sm text-gray-700 line-clamp-2">
                              {{ dancer.aboutMe }}
                            </p>
                          }
                        </div>
                      </div>
                    </div>
                  }

                  <!-- Show More Button -->
                  @if (hasMoreResults()) {
                    <div class="flex justify-center">
                      <button
                        data-testid="show-more-button"
                        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-rose-700 bg-rose-100 hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                        (click)="loadMoreDancers()"
                      >
                        Weitere anzeigen
                      </button>
                    </div>
                  }
                </div>
              }

              <!-- Empty State -->
              @if (!isLoading() && !hasError() && dancers().length === 0) {
                <div data-testid="empty-find-state" class="text-center py-12">
                  <div class="mx-auto max-w-md">
                    <div class="mx-auto h-12 w-12 text-gray-400">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239"
                        />
                      </svg>
                    </div>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">
                      Keine Tänzer gefunden
                    </h3>
                    <p
                      data-testid="empty-find-message"
                      class="mt-1 text-sm text-gray-500"
                    >
                      Keine Tänzer entsprechen den gewählten Filterkriterien.
                    </p>
                  </div>
                </div>
              }

              <!-- Error State -->
              @if (!isLoading() && hasError()) {
                <div data-testid="find-error-state" class="text-center py-12">
                  <div class="mx-auto max-w-md">
                    <div class="mx-auto h-12 w-12 text-red-400">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">
                      Fehler beim Laden
                    </h3>
                    <p
                      data-testid="find-error-message"
                      class="mt-1 text-sm text-gray-500"
                    >
                      Es ist ein Fehler aufgetreten. Bitte versuchen Sie es
                      später erneut.
                    </p>
                  </div>
                </div>
              }
            }
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindDancersComponent {
  private dancersService = inject(DancersHttpService);
  private router = inject(Router);

  // Form controls
  filtersForm = new FormGroup({
    gender: new FormControl<'ALL' | 'MALE' | 'FEMALE'>('ALL'),
    distance: new FormControl<number>(20),
  });

  // State signals
  private searchFilters = signal<{
    gender: 'ALL' | 'MALE' | 'FEMALE';
    distance: number;
  } | null>(null);
  private searchState = signal<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  private searchResults = signal<Dancer[]>([]);

  // Computed state signals
  showResults = computed(() => this.searchFilters() !== null);
  isLoading = computed(() => this.searchState() === 'loading');
  hasError = computed(() => this.searchState() === 'error');
  dancers = computed(() => this.searchResults());
  hasMoreResults = signal(false); // For future pagination

  constructor() {
    // Effect to trigger API calls when filters change
    effect(() => {
      const filters = this.searchFilters();
      if (filters) {
        this.performSearch(filters);
      }
    });
  }

  private performSearch(filters: {
    gender: 'ALL' | 'MALE' | 'FEMALE';
    distance: number;
  }): void {
    this.searchState.set('loading');

    this.dancersService.searchDancers$(filters).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.searchResults.set(response.payload);
          this.searchState.set('success');
        } else {
          this.searchState.set('error');
        }
      },
      error: () => {
        this.searchState.set('error');
      },
    });
  }

  applyFilters(): void {
    const filters = {
      gender: this.filtersForm.value.gender || 'ALL',
      distance: this.filtersForm.value.distance || 20,
    };

    this.searchFilters.set(filters);
  }

  loadMoreDancers(): void {
    // Implementation for pagination
  }

  viewProfile(dancerId: string): void {
    this.router.navigate(['/profile/view', dancerId]);
  }

  trackByDancerId(index: number, dancer: Dancer): string {
    return dancer.id;
  }
}
