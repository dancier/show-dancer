import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      public-profile works and the id is
      {{ activeRoute.snapshot.params['participantId'] }}
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicProfileComponent {
  public readonly activeRoute = inject(ActivatedRoute);
}
