import { Component, Input, OnInit } from '@angular/core';
import { RecommendedDancer } from '../../types/recommended-dancers.types';
import { ImageService } from '@shared/image/image.service';
import { EventLogService } from '@shared/logging/event-log.service';
import { ChatService } from '../../../chat/common/services/chat.service';

@Component({
  selector: 'app-recommended-dancer',
  templateUrl: './recommended-dancer.component.html',
  styleUrls: ['./recommended-dancer.component.scss'],
  standalone: true,
})
export class RecommendedDancerComponent implements OnInit {
  @Input()
  dancer!: RecommendedDancer;

  imgSrc: string | undefined;

  constructor(
    public imageService: ImageService,
    private readonly eventLogService: EventLogService,
    private chatService: ChatService
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

  openChat(): void {
    this.chatService.openChatWith(this.dancer.id);
  }
}
