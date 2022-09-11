import { FormControl } from '@angular/forms';
import { DanceLevel, DanceRole, DanceTypes } from '@data/types/profile.types';

export type DanceForm = {
  type: FormControl<DanceTypes>,
  leading: FormControl<DanceRole>,
  level: FormControl<DanceLevel>,
}
