import { Component, Input, OnInit } from '@angular/core';
import { RecommendedDancer } from '../../types/recommended-dancers.types';
import { ImageService } from '@core/image/image.service';
import { EventLogService } from '@core/logging/event-log.service';
import { AuthenticationService } from '@core/auth/services/authentication.service';
import { AuthStorageService } from '@core/auth/services/auth-storage.service';

@Component({
  selector: 'app-recommended-dancer',
  templateUrl: './recommended-dancer.component.html',
  styleUrls: ['./recommended-dancer.component.scss'],
})
export class RecommendedDancerComponent implements OnInit {
  @Input()
  dancer!: RecommendedDancer;

  imgSrc: string | undefined;

  constructor(
    public imageService: ImageService,
    private readonly eventLogService: EventLogService
  ) {}

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
