import { ModelForm } from '@shared/types/forms.types';
import { PersonalData } from '../../../common/types/profile.types';

export type PersonalDataForm = ModelForm<PersonalData, { birthDate: Date }>;
