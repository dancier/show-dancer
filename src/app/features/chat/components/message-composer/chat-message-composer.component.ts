import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ChatStore } from '../../common/services/chat.store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  form: MessageComposerForm;

  constructor(
    private fb: NonNullableFormBuilder,
    private chatStore: ChatStore
  ) {
    this.form = this.fb.group({
      message: this.fb.control('', [Validators.required]),
    });
  }

  postMessage(): void {
    if (this.form.valid) {
      this.chatStore.sendMessage(this.form.value.message!.toString());
      this.form.reset();
    }
  }
}
