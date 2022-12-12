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

export type ChatType = 'group' | 'direct';

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
  profileImageHash: string;
};

export type DancerMap = {
  [key: DancerId]: Dancer;
};

export type ChatsAndDancers = {
  chatList: Chat[],
  dancerMap: DancerMap
}
