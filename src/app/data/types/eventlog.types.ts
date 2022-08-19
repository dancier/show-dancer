export type Topic = 'app_instance_id_created' | 'page_request_via_advertisement';

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
