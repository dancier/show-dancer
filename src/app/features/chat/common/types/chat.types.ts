import { Profile } from '@features/profile/common/types/profile.types';

export type Chat = {
  chatId: string;
  dancerIds: DancerId[];
  lastActivity: string;
  type: ChatType;
  lastMessage: ChatMessage;
};

export type ChatMessage = {
  text: string;
  authorId: DancerId;
  id: string;
  readByDancers: DancerId[];
  createdAt: string;
};

export type ChatType = 'GROUP' | 'DIRECT';

export type ChatList = {
  chats: Chat[];
};

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
  [key: string]: ChatMessage[];
};

export type ChatsAndDancers = {
  chatList: Chat[];
  dancerMap: DancerMap;
};

export type MessageResponse = {
  messages: ChatMessage[];
};

export type CreateMessageRequest = {
  text: string;
};

export type ChatData = {
  chats: Chat[];
  dancers: DancerMap;
  profile: Profile;
};
