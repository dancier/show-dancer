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
} from '@angular/forms';
import { ChatStore } from '../../common/services/chat.store';

type MessageComposerForm = FormGroup<{ message: FormControl<string> }>;

@Component({
  selector: 'app-chat-message-composer',
  templateUrl: './chat-message-composer.component.html',
  styleUrls: ['./chat-message-composer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // needed to remove the bottom margin from mat-form-field
  encapsulation: ViewEncapsulation.None,
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
