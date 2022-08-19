import { EditAbleToDanceComponent } from './edit-able-to-dance.component';
import { MatIconModule } from '@angular/material/icon';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';
import { EditDanceTypeComponent } from '@features/profile/components/edit-dance-type/edit-dance-type.component';

describe('AddAbleToDanceComponent', () => {
  let spectator: Spectator<EditAbleToDanceComponent>;

  const createComponent = createComponentFactory({
    component: EditAbleToDanceComponent,
    imports: [MatIconModule],
    declarations: [MockComponent(EditDanceTypeComponent)],
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
