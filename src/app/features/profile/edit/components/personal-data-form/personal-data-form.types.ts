import { ModelForm } from '@shared/common/types/forms.types';
import { PersonalData } from '../../../common/types/profile.types';

export type PersonalDataForm = ModelForm<PersonalData, { birthDate: Date }>;
