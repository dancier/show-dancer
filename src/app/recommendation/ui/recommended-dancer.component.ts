import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendedDancer } from '../data-access/types/recommended-dancers.types';
import { ImageService } from '@shared/data-access/image.service';
import { EventLogService } from '@shared/data-access/log/event-log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommended-dancer',
  imports: [CommonModule],
  template: `<div
    class="flex flex-col sm:flex-row cursor-pointer gap-x-12 gap-y-8 rounded border bg-gray-50 px-6 sm:px-12 py-8 hover:bg-gray-200"
  >
    <div class="shrink-0 text-center">
      <img
        class="h-40 w-40 rounded-full mx-auto"
        alt="Profilbild des Tänzers"
        [src]="imgSrc"
        (error)="handleMissingImage($event)"
      />
    </div>
    <div class="grow">
      <div class="mb-6 truncate text-3xl">{{ dancer.name }}</div>

      <div class="flex gap-x-20 gap-y-2 flex-col lg:flex-row">
        <div class="basis-1/2 overflow-hidden">
          <div class="mb-1.5 flex items-center gap-x-4">
            <div class="grow-0">
              <svg class="h-6 w-6">
                <use href="assets/icons/bootstrap-icons.svg#calendar3" />
              </svg>
            </div>
            <div class="min-w-0 grow">
              <div
                class="mb-0.5 truncate text-ellipsis whitespace-nowrap text-xl"
              >
                {{ dancer.age }} Jahre alt
              </div>
            </div>
          </div>

          <div class="mb-1.5 flex items-center gap-x-4">
            <div class="grow-0">
              <svg class="h-6 w-6">
                <use href="assets/icons/bootstrap-icons.svg#buildings" />
              </svg>
            </div>
            <div class="min-w-0 grow">
              <div class="mb-0.5 truncate whitespace-nowrap text-xl">
                wohnt in {{ dancer.city }}
              </div>
            </div>
          </div>

          <div class="mb-1.5 flex items-center gap-x-4">
            <div class="grow-0">
              <svg class="h-6 w-6">
                <use
                  href="assets/icons/bootstrap-icons.svg#music-note-beamed"
                />
              </svg>
            </div>
            <div class="min-w-0 grow">
              <div class="mb-0.5 truncate whitespace-nowrap text-xl">
                tanzt gerne
                @for (dance of dancer.dances; track dance; let isLast = $last) {
                  <span>{{ dance }}{{ isLast ? '' : ', ' }}</span>
                }
              </div>
            </div>
          </div>
        </div>
        <div class="basis-1/2 overflow-hidden">
          <div class="mb-1.5 flex items-start gap-x-4">
            <div class="grow-0">
              <svg class="h-6 w-6">
                <use href="assets/icons/bootstrap-icons.svg#info-square" />
              </svg>
            </div>
            <div class="min-w-0 grow">
              <div class="mb-0.5 whitespace-nowrap text-sm text-gray-500">
                Über mich
              </div>
              <div class="line-clamp-2 text-xl">
                {{ dancer.about }} dolor sit amet, consetetur sadipscing elitr,
                asdf asd fasdf asdf
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--      <div class="mb-1 text-lg">{{ dancer.age }} Jahre</div>-->
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendedDancerComponent implements OnInit {
  @Input({ required: true })
  dancer!: RecommendedDancer;

  imageService = inject(ImageService);
  eventLogService = inject(EventLogService);
  router = inject(Router);

  imgSrc: string | undefined;

  ngOnInit(): void {
    this.imgSrc = this.imageService.getDancerImageSrcOrDefault(
      this.dancer.imageHash,
      456
    );
  }

  handleMissingImage($event: ErrorEvent): void {
    this.eventLogService.createAndPublishEvent('frontend_error', {
      context: 'RecommendedDancerComponent',
      message: 'unable to load profile image for recommended dancer',
      recommendedDancerId: this.dancer.id,
      errorEventMessage: $event.message,
    });
    this.imgSrc = this.imageService.getDefaultDancerImage();
  }
}
