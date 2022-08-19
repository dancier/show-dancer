import { APIResponse } from '@data/types/shared.types';

export const errorMessages: Record<APIResponse, string> = {
  SERVER_ERROR: 'Ein unerwarteter Fehler ist aufgetreten.\nBitte versuche es später erneut.',
  EMAIL_ALREADY_IN_USE: 'Ein Account mit dieser E-Mail Adresse existiert bereits.',
  INCORRECT_CREDENTIALS: 'Der Nutzername oder das Passwort ist falsch.',
  EMAIL_NOT_VALIDATED: 'Die E-Mail Adresse wurde noch nicht verifiziert.\nBitte schauen Sie in ihrem E-Mail Postfach nach.',
  SUCCESS: '',
  VALIDATION_ERROR: ''
} as const;

