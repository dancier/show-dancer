import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChatStateService } from '../../data-access/chat-state.service';

type MessageComposerForm = FormGroup<{ message: FormControl<string> }>;

@Component({
  selector: 'app-chat-message-composer',
  template: `
    <form class="flex px-6 py-4" [formGroup]="form" (ngSubmit)="postMessage()">
      <mat-form-field appearance="outline" class="w-full">
        <input
          matInput
          placeholder="Schreib eine Nachricht"
          formControlName="message"
        />
        <button matSuffix mat-icon-button type="submit">
          <mat-icon>send</mat-icon>
        </button>
      </mat-form-field>
    </form>
  `,
  styles: [
    `
      mat-form-field {
        .mat-mdc-form-field-bottom-align {
          display: none;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // needed to remove the bottom margin from mat-form-field
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ChatMessageComposerComponent {
  fb = inject(NonNullableFormBuilder);
  chatState = inject(ChatStateService);

  form: MessageComposerForm = this.fb.group({
    message: this.fb.control('', [Validators.required]),
  });

  // constructor(
  //   private fb: NonNullableFormBuilder,
  //   private chatStore: ChatStore
  // ) {
  //   this.form = this.fb.group({
  //     message: this.fb.control('', [Validators.required]),
  //   });
  // }

  postMessage(): void {
    if (this.form.valid) {
      this.chatState.sendMessage$.next(this.form.value.message!.toString());
      this.form.reset();
    }
  }
}
