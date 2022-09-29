import { FormControl } from '@angular/forms';
import { Dance } from '../../types/profile.types';

export type DanceForm = Record<keyof Dance, FormControl<any>>;
