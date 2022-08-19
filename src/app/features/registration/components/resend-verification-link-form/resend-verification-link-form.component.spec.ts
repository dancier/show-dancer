import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import {
  ResendVerificationLinkFormComponent
} from '@features/registration/components/resend-verification-link-form/resend-verification-link-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('ResendVerificationLinkFormComponent', () => {
  let spectator: Spectator<ResendVerificationLinkFormComponent>;
  const createComponent = createComponentFactory({
    component: ResendVerificationLinkFormComponent,
    imports: [
      MatCardModule,
      MatFormFieldModule,
      MatInputModule
    ]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
