import { Component, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

type MessageComposerForm = FormGroup<{ message: FormControl<string> }>;

@Component({
  selector: 'app-chat-message-composer',
  templateUrl: './chat-message-composer.component.html',
  styleUrls: ['./chat-message-composer.component.scss'],
  // needed to remove the bottom margin from mat-form-field
  encapsulation: ViewEncapsulation.None,
})
export class ChatMessageComposerComponent {
  form: MessageComposerForm;

  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      message: this.fb.control('', [Validators.required]),
    });
  }

  postMessage(): void {
    if (this.form.valid) {
      console.log('posting message', this.form.value.message);
      this.form.reset();
    } else {
      console.log('invalid form');
    }
  }
}
