import { Component, inject, Input, OnInit } from '@angular/core';
import { RecommendedDancer } from '../../types/recommended-dancers.types';
import { ImageService } from '@shared/image/image.service';
import { EventLogService } from '@shared/logging/event-log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommended-dancer',
  template: `
    <div class="wrapper">
      <div class="dancer-image">
        <img
          class="rounded-t-lg"
          alt="Profilbild des Tänzers"
          [src]="imgSrc"
          (error)="handleMissingImage($event)"
        />
      </div>
      <div class="dancer-info">
        <div class="dancer-header">
          <span class="username">{{ dancer.name }}</span
          >, {{ dancer.age }}
        </div>
        <div class="dancer-subheader">{{ dancer.city }}</div>
        <div
          tabindex="0"
          class="rounded bg-rose-700 p-2 text-white"
          (click)="openChat()"
        >
          Chat öffnen
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./recommended-dancer.component.scss'],
  standalone: true,
})
export class RecommendedDancerComponent implements OnInit {
  @Input()
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

  openChat(): void {
    this.router.navigate(['chat'], {
      queryParams: { participantId: this.dancer.id },
    });
  }
}
