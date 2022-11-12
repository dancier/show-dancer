import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { SendVerificationLinkFormComponent } from '@features/registration/components/send-verification-link-form/send-verification-link-form.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

describe('SendVerificationLinkFormComponent', () => {
  let spectator: Spectator<SendVerificationLinkFormComponent>;
  const createComponent = createComponentFactory({
    component: SendVerificationLinkFormComponent,
    imports: [MatCardModule, MatFormFieldModule, MatInputModule],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
