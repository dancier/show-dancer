export type Chat = {
  chatId: string;
  dancerIds: DancerId[];
  lastActivity: Date;
  type: ChatType;
  lastMessage: ChatMessage;
};

export type ChatMessage = {
  text: string;
  author: DancerId;
  id: string;
  readByDancers: DancerId[];
  creationTimestamp: Date;
};

export type ChatType = 'GROUP' | 'DIRECT';

export type ChatList = {
  chats: Chat[];
}

export type DancersRequest = {
  dancerIds: DancerId[];
};

export type DancerId = string;

export type Dancer = {
  id: DancerId;
  dancerName: string;
  city: string;
  profileImageHash?: string;
};

export type DancerMap = {
  [key: DancerId]: Dancer;
};

export type MessagesByChatMap = {
  [key: string]: ChatMessage[]
}

export type ChatsAndDancers = {
  chatList: Chat[],
  dancerMap: DancerMap
}

export type MessageResponse = {
  messages: ChatMessage[]
}
