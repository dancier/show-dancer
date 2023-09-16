import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventLogService } from '@shared/logging/event-log.service';

@Component({
  selector: 'app-landing-page',
  template: `
    <header
      class="bg-gradient-to-t from-orange-300 to-red-400 p-10 lg:bg-gradient-to-l lg:p-20"
    >
      <div
        class="mx-auto flex max-w-[1600px] flex-col items-center gap-4 lg:flex-row lg:justify-around lg:gap-20"
      >
        <div
          class="w-full max-w-[50vh] flex-none lg:max-w-[600px] lg:basis-[50%]"
        >
          <img
            class="h-auto w-full max-w-[100%] drop-shadow"
            src="assets/img/landing-page/header-dancers.svg"
            alt="Vector graphic of people dancing"
          />
        </div>
        <div class="shrink-0 grow-0 text-center lg:basis-[400px] lg:text-right">
          <div
            role="heading"
            aria-level="1"
            class="my-4 text-7xl font-bold text-white drop-shadow lg:text-9xl"
          >
            Dancier
          </div>
          <div
            role="heading"
            aria-level="2"
            class="text-3xl font-bold text-red-900 lg:text-4xl"
          >
            Wir verbinden Tänzer
          </div>
          <button
            class="my-12 cursor-pointer rounded bg-red-900 py-3 px-8 text-xl font-bold text-white lg:text-2xl"
            (click)="navigateToRegistration()"
          >
            Jetzt registrieren
          </button>
        </div>
      </div>
    </header>

    <main>
      <section class="p-12 sm:p-24">
        <div
          role="heading"
          aria-level="2"
          class="my-5 text-center text-3xl font-bold sm:text-5xl"
        >
          Finde Tanzpartner die zu dir passen
        </div>
        <p class="text-center text-xl sm:text-2xl">
          Du füllst dein Profil aus. Wir kümmern uns um den Rest.
        </p>

        <div
          class="mx-auto flex max-w-[1600px] flex-col gap-12 pt-16 text-lg sm:pt-24 lg:flex-row lg:gap-24"
        >
          <section class="basis-1/3">
            <div role="heading" aria-level="3" class="mb-3 font-bold">
              Kostenlos
            </div>
            <p>
              Die Tanzpartnersuche ist ein Service, den wir euch kostenlos zur
              Verfügung stellen. Uns geht es nicht ums Geld - unser Ziel ist es,
              Tänzer zu verbinden.
            </p>
          </section>
          <section class="basis-1/3">
            <div role="heading" aria-level="3" class="mb-3 font-bold">
              Auf dich zugeschnitten
            </div>
            <p>
              Nachdem du dein Profil ausgefüllt hast, schlagen wir dir
              potentielle Tanzpartner vor, die deinen Wünschen entsprechen.
            </p>
          </section>
          <section class="basis-1/3">
            <div role="heading" aria-level="3" class="mb-3 font-bold">
              Open Source
            </div>
            <p>
              Dancier ist ein Open-Source-Projekt von engagierten Entwicklern.
              Wir wollen die Plattform mit dir gestalten.
            </p>
          </section>
        </div>
      </section>
    </main>
  `,
  standalone: true,
})
export class LandingPageComponent {
  constructor(private router: Router, private eventService: EventLogService) {}

  navigateToRegistration(): void {
    this.eventService.createAndPublishEvent('navigated_to_page', {
      origin: 'landing-page-hero-cta',
      page: 'registration',
    });
    this.router.navigate(['/registration']);
  }
}