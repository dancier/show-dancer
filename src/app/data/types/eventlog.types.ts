export type PostEventResponse =
| 'SUCCESS'
| 'SERVER_ERROR';

export type Topic =
  | 'app_instance_id_created'
  | 'page_request_via_advertisement'
  | 'beta_registration_succeeded'
  | 'human_session_created'
  | 'contact_message_sent'
  ;

export type Metadata = {
  sourceTime: string,
  appInstanceId: string
}

export type Event = {
    topic: Topic,
    metaData: Metadata,
    payload: {
      emailAddress?: string
    }
}
