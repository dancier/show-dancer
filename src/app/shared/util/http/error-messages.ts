import { APIError } from './response.types';

export const errorMessages: Record<APIError, string> = {
  SERVER_ERROR:
    'Ein unerwarteter Fehler ist aufgetreten.\nBitte versuche es später erneut.',
  EMAIL_ALREADY_IN_USE:
    'Ein Account mit dieser E-Mail Adresse existiert bereits.',
  INCORRECT_CREDENTIALS: 'Der Nutzername oder das Passwort ist falsch.',
  EMAIL_NOT_VALIDATED:
    'Die E-Mail Adresse wurde noch nicht verifiziert.\nBitte schaue in deinem E-Mail Postfach nach.',
  NOT_AVAILABLE: 'Der Benutzername ist leider schon vergeben.',
  VALIDATION_ERROR: 'Bei der Validierung der Daten ist ein Fehler aufgetreten',
  CODE_VALIDATION_ERROR:
    'Der von dir benutzte Link ist nicht gültig, bitte fordere einen neuen an.',
  NAME_ALREADY_EXISTS:
    'Es tut uns leid, der Benutzername ist bereits vergeben. Bitte wähle einen neuen Namen.',
  NOT_A_HUMAN:
    'Bitte löse das Captcha, um zu beweisen, dass du ein Mensch bist.',
  ZIP_CODE_NOT_FOUND:
    'Leider konnten wir keine Stadt zu dieser Postleitzahl finden. Bitte überprüfe deine Eingabe.',
} as const;
