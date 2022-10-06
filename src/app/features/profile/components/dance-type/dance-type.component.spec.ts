import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MatIconModule } from '@angular/material/icon';
import { DanceTypeComponent } from '@features/profile/components/dance-type/dance-type.component';

describe('DanceTypeComponent', () => {
  let spectator: Spectator<DanceTypeComponent>;
  const createComponent = createComponentFactory({
    component: DanceTypeComponent,
    imports: [MatIconModule],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
