import { Profile } from '../../../profile/data-access/types/profile.types';

export type Conversation = {
  chatId: string;
  participants: ChatParticipant[];
};

export type ChatDto = {
  chatId: string;
  dancerIds: DancerId[];
  lastActivity: string | null;
  type: ChatType;
  lastMessage: ChatMessage | null;
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
  chats: ChatDto[];
};

export type DancersRequest = {
  dancerIds: DancerId[];
};

export type DancerId = string;

export type ChatParticipant = {
  id: DancerId;
  dancerName?: string;
  city?: string;
  profileImageHash?: string;
};

export type DancerMapDto = {
  [key: DancerId]: ChatParticipant;
};

export type MessagesByChatMap = {
  [key: string]: ChatMessage[];
};

export type ChatsAndDancers = {
  chatList: ChatDto[];
  dancerMap: DancerMapDto;
};

export type MessageResponse = {
  messages: ChatMessage[];
};

export type MessageResponseWithChatId = MessageResponse & {
  chatId: string;
};

export type CreateMessageRequest = {
  text: string;
};

export type ChatData = {
  chats: ChatDto[];
  dancers: DancerMapDto;
  profile: Profile;
};

export type CreateChatResponse = {
  chatId: string;
  dancerIds: string[];
  lastActivity: null;
  type: 'DIRECT';
  lastMessage: null;
};
