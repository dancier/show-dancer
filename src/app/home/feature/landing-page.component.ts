import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventLogService } from '@shared/data-access/log/event-log.service';
import { AuthService } from '@shared/data-access/auth/auth.service';

@Component({
  selector: 'app-landing-page',
  template: `
    <header
      class="bg-gradient-to-t from-orange-300 to-red-400 py-12 font-playful tracking-wide lg:bg-gradient-to-l lg:py-16"
    >
      <div
        class="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-4 md:px-10 lg:flex-row lg:justify-between lg:gap-20"
      >
        <div
          class="w-full max-w-[300px] flex-none lg:max-w-[500px] lg:basis-[50%]"
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
          @if (!isLoggedIn()) {
            <button
              class="mt-12 cursor-pointer rounded bg-red-900 py-3 px-8 text-xl font-bold text-white transition-all duration-200 ease-in-out hover:bg-white hover:text-red-900 lg:text-2xl"
              (click)="navigateToRegistration()"
            >
              Jetzt registrieren
            </button>
          }
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-[1200px] px-4 md:px-10">
      <section class="pt-14 sm:pt-36">
        <div
          role="heading"
          aria-level="2"
          class="my-5 text-center font-playful text-3xl font-bold tracking-wide sm:text-5xl"
        >
          Finde Tanzpartner die zu dir passen
        </div>
        <p class="text-center text-xl sm:text-2xl">
          Sag uns, wer du bist und welchen Tanz du liebst – den Rest übernehmen
          wir.
        </p>

        <div
          class="mx-auto flex max-w-[1600px] flex-col gap-12 pt-16 text-lg sm:pt-20 lg:flex-row lg:gap-24"
        >
          <section class="basis-1/3">
            <div role="heading" aria-level="3" class="mb-3 font-bold">
              Auf dich zugeschnitten
            </div>
            <p class="hyphens-auto mb-0">
              Jeder Tänzer ist einzigartig. Deshalb bieten wir dir mithilfe
              unseres Matching-Algorithmus maßgeschneiderte Partnerempfehlungen,
              die so individuell sind wie du.
            </p>
          </section>
          <section class="basis-1/3">
            <div role="heading" aria-level="3" class="mb-3 font-bold">
              Kostenlos
            </div>
            <p class="mb-0">
              Wir glauben, dass die Liebe zum Tanz unbezahlbar ist. Deshalb ist
              Dancier für dich kostenlos. Uns geht es nicht ums Geld - unser
              Ziel ist es, Tänzer zu verbinden.
            </p>
          </section>
          <section class="basis-1/3">
            <div role="heading" aria-level="3" class="mb-3 font-bold">
              Open Source
            </div>
            <p class="mb-0">
              Dancier wächst mit seiner Gemeinschaft. Als Open-Source-Projekt
              laden wir dich ein, mit uns gemeinsam die beste Plattform für
              Tänzer zu gestalten.
            </p>
          </section>
        </div>
      </section>

      <section class="py-14 sm:py-36">
        <div class="pb-4 sm:pb-6">
          <div
            role="heading"
            aria-level="2"
            class="my-5 text-center font-playful text-3xl font-bold tracking-wide sm:text-5xl"
          >
            Das sind wir
          </div>
          <p class="text-center sm:text-2xl max-w-[800px] mx-auto my-5">
            Bei Dancier dreht sich alles um die Liebe zum Tanz – eine
            Leidenschaft, die uns alle verbindet.
          </p>
        </div>

        <div class="flex pb-4 sm:pb-6 items-center justify-between flex-wrap">
          <div
            class="py-8 flex flex-col items-center gap-4 rounded-lg basis-1/2 md:basis-1/4"
          >
            <img
              class="rounded-full w-36 h-36"
              src="../../../assets/img/about-us/marc-profile.jpg"
            />
            <div>
              <p class="font-bold mb-0">Marc Gorzala</p>
            </div>
          </div>

          <div
            class="py-8 flex flex-col items-center gap-4 rounded-lg basis-1/2 md:basis-1/4"
          >
            <img
              class="rounded-full w-36 h-36"
              src="../../../assets/img/about-us/dominik-profile.jpg"
            />
            <div>
              <p class="font-bold mb-0">Dominik Halfkann</p>
            </div>
          </div>

          <div
            class="py-8 flex flex-col items-center gap-4 rounded-lg basis-1/2 md:basis-1/4"
          >
            <img
              class="rounded-full w-36 h-36"
              src="../../../assets/img/about-us/xiaofei-profile.jpg"
            />
            <div>
              <p class="font-bold mb-0">Xiaofei Gorzala</p>
            </div>
          </div>

          <div
            class="py-8 flex flex-col items-center gap-4 rounded-lg basis-1/2 md:basis-1/4"
          >
            <img
              class="rounded-full w-36 h-36"
              src="../../../assets/img/about-us/jan-profile.jpg"
            />
            <div>
              <p class="font-bold mb-0">Jan Stoppel</p>
            </div>
          </div>
        </div>

        <div>
          <p class="text-center sm:text-xl max-w-[800px] mx-auto">
            Unser Team besteht aus tanzbegeisterten Menschen, die aus eigener
            Erfahrung wissen, wie bereichernd die richtige Tanzpartnerschaft
            sein kann. Deshalb haben wir Dancier ins Leben gerufen: eine
            Plattform, die darauf ausgerichtet ist, dich mit Gleichgesinnten
            zusammenzubringen.
          </p>
        </div>
      </section>
    </main>
  `,
  imports: [],
})
export class LandingPageComponent {
  private router = inject(Router);
  private eventService = inject(EventLogService);
  public isLoggedIn = inject(AuthService).isLoggedIn;

  navigateToRegistration(): void {
    this.eventService.createAndPublishEvent('navigated_to_page', {
      origin: 'landing-page-hero-cta',
      page: 'registration',
    });
    this.router.navigate(['/registration']);
  }
}
