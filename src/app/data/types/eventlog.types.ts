export type PostEventResponse =
| 'SUCCESS'
| 'SERVER_ERROR';

export enum Topic {
  APP_INSTANCE_ID_CREATED = 'app_instance_id_created',
}

export type Metadata = {
  sourceTime: string,
  appInstanceId: string
}

export type EventLogEvent = {
    topic: Topic,
    metaData: Metadata,
    payload: {
      emailAddress?: string
    }
}
