export type PostEventResponse =
| 'SUCCESS'
| 'SERVER_ERROR';

export enum Topic {
  app_instance_id_created,
  registration_succeded_event
}

export type Metadata = {
  sourceTime: string,
  appInstanceId: string
}

export type EventLogEvent = {
    topic: Topic,
    metaData: Metadata,
    payload?: {
      emailAddress: string
    }
}
