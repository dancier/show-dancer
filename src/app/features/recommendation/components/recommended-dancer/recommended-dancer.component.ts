import { Component, Input } from '@angular/core';
import { RecommendedDancer } from '../../types/recommended-dancers.types';
import { ImageService } from '@core/image/image.service';

@Component({
  selector: 'app-recommended-dancer',
  templateUrl: './recommended-dancer.component.html',
  styleUrls: ['./recommended-dancer.component.scss'],
})
export class RecommendedDancerComponent {
  @Input()
  dancer!: RecommendedDancer;

  constructor(public imageService: ImageService) {}
}
