export type Topic =
  | 'app_instance_id_created'
  | 'page_request_via_advertisement'
  | 'contact_message_sent'
  | 'human_session_created'
  | 'navigated_to_page'
  | 'frontend_error'
  | 'test';

export type Metadata = {
  sourceTime: string;
  appInstanceId: string;
};

export type Event = {
  topic: Topic;
  metaData: Metadata;
  payload: {
    emailAddress?: string;
  };
};
