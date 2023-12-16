import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayGenderPipe } from '../util/pipes/display-gender.pipe';

@Component({
  selector: 'app-profile-data-entry',
  standalone: true,
  imports: [CommonModule, DisplayGenderPipe],
  template: `
    <div class="flex items-start gap-x-7 gap-y-4 border-b px-2 py-4">
      <div class="grow-0 pt-1.5">
        <svg class="h-10 w-10">
          <use [attr.href]="'assets/icons/bootstrap-icons.svg#' + icon" />
        </svg>
      </div>
      <div class="grow">
        <div class="mb-0.5 whitespace-nowrap text-sm text-gray-500">
          {{ label }}
        </div>
        <div class="text-2xl">
          {{ value }}
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileDataEntryComponent {
  @Input({ required: true })
  icon!: string;

  @Input({ required: true })
  label!: string;

  @Input({ required: true })
  value!: string;
}
