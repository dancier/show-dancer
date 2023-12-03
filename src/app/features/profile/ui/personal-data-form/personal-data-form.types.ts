import { ModelForm } from '@shared/common/types/forms.types';
import { PersonalData } from '../../data-access/types/profile.types';

export type PersonalDataForm = ModelForm<PersonalData, { birthDate: Date }>;
