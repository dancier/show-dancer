import { EnterUserNameComponent } from './enter-user-name.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MockProvider } from 'ng-mocks';
import { ProfileService } from '@features/profile/services/profile.service';
import { ProfileHttpService } from '@features/profile/services/profile-http.service';

describe('EnterUserNameComponent', () => {
  let spectator: Spectator<EnterUserNameComponent>;

  const createComponent = createComponentFactory({
    component: EnterUserNameComponent,
    imports: [
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
    ],
    providers: [MockProvider(ProfileService), MockProvider(ProfileHttpService)],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
