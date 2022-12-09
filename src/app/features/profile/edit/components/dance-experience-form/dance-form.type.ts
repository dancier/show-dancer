import { FormArray, FormGroup } from '@angular/forms';
import { Dance } from '../../../common/types/profile.types';
import { ModelForm } from '@shared/types/forms.types';

export type DanceExperienceEntryForm = ModelForm<Dance, {}>;

export type DanceExperienceFormArray = FormArray<
  FormGroup<DanceExperienceEntryForm>
>;

export type DanceExperienceForm = {
  dances: DanceExperienceFormArray;
};
