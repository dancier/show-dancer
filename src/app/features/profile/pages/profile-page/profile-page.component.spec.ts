import { ProfilePageComponent } from './profile-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponents } from 'ng-mocks';
import { DanceTypeComponent } from '@features/profile/components/dance-type/dance-type.component';
import { PersonalDataComponent } from '@features/profile/components/personal-data/personal-data.component';

describe('ProfilePageComponent', () => {
  let spectator: Spectator<ProfilePageComponent>;

  const createComponent = createComponentFactory({
    component: ProfilePageComponent,
    imports: [MatTabsModule],
    declarations: [MockComponents(DanceTypeComponent, PersonalDataComponent)],
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
