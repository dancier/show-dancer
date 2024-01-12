import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { SendVerificationLinkFormComponent } from './send-verification-link-form.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MockProvider } from 'ng-mocks';
import { AuthHttpService } from '@shared/data-access/auth/auth-http.service';
import { ActivatedRoute } from '@angular/router';

describe('SendVerificationLinkFormComponent', () => {
  let spectator: Spectator<SendVerificationLinkFormComponent>;
  const createComponent = createComponentFactory({
    component: SendVerificationLinkFormComponent,
    imports: [
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
    ],
    providers: [
      MockProvider(AuthHttpService),
      MockProvider(AuthHttpService),
      MockProvider(ActivatedRoute),
    ],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
