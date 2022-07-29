export type ContactPayload = {
  sender: string;
  message: string;
};

export type ContactResponse =
  | 'SUCCESS'
  | 'SERVER_ERROR'
  | 'UNAUTHORIZED';
