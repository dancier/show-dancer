import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponents } from 'ng-mocks';
import { LoginFormComponent } from '@features/home/components/login-form/login-form.component';
import { LandingPageComponent } from '@features/home/pages/landing-page/landing-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

describe('LandingPageComponent', () => {
  let spectator: Spectator<LandingPageComponent>;
  const createComponent = createComponentFactory({
    component: LandingPageComponent,
    declarations: [
      MockComponents(LoginFormComponent)
    ],
    imports: [
      MatCardModule,
      MatIconModule,
    ]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
