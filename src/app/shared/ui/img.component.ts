import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentService } from '../data-access/environment.service';
import { WithAuthPipe } from '../util/auth/with-auth.pipe';

@Component({
  selector: 'app-img',
  standalone: true,
  imports: [CommonModule, WithAuthPipe],
  template: `
    @if (!environment.isLocalDevelopment() && src) {
      <img
        [attr.alt]="altText"
        [attr.src]="src"
        [attr.class]="imgClass"
        (error)="handleError($event)"
      />
    }
    @if (environment.isLocalDevelopment() && src) {
      <img
        [attr.alt]="altText"
        [attr.src]="src | withAuth | async"
        [attr.class]="imgClass"
        (error)="handleError($event)"
      />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgComponent {
  @Input({ required: true }) src: string | undefined;

  @Input()
  imgClass: string = '';

  @Input()
  altText: string = '';

  @Output()
  imgError = new EventEmitter<ErrorEvent>();

  public readonly environment = inject(EnvironmentService);

  handleError($event: ErrorEvent): void {
    this.imgError.emit($event);
  }
}
