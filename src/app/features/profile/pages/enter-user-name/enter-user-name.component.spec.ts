import { EnterUserNameComponent } from './enter-user-name.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('EnterUserNameComponent', () => {
  let spectator: Spectator<EnterUserNameComponent>;

  const createComponent = createComponentFactory({
    component: EnterUserNameComponent,
    imports: [MatCardModule, MatFormFieldModule, MatInputModule],
    declarations: [],
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
