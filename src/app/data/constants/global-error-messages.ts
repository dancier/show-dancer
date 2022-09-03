import { APIError } from '@data/types/response.types';

export type ErrorMessages = Record<APIError, string>;

export const globalErrorMessages: ErrorMessages = {
  SERVER_ERROR: 'Ein unerwarteter Fehler ist aufgetreten.\nBitte versuche es später erneut.',
  EMAIL_ALREADY_IN_USE: 'Ein Account mit dieser E-Mail Adresse existiert bereits.',
  INCORRECT_CREDENTIALS: 'Der Nutzername oder das Passwort ist falsch.',
  EMAIL_NOT_VALIDATED: 'Die E-Mail Adresse wurde noch nicht verifiziert.\nBitte schaue in deinem E-Mail Postfach nach.',
  NOT_AVAILABLE: 'Der Benutzername ist leider schon vergeben.',
  VALIDATION_ERROR: ''
} as const;

