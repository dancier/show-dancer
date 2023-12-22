export type ChatDto = {
  chatId: string;
  participantIds: DancerId[];
  lastActivity: string | null;
  createdAt: string;
  lastMessage: ChatMessage | null;
};

export type ChatMessage = {
  text: string;
  authorId: DancerId;
  id: string;
  readByParticipants: DancerId[] | null;
  createdAt: string;
};

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

export type MessageResponse = ChatMessage[];

export type MessagesWithChatId = {
  messages: ChatMessage[];
  chatId: string;
};

export type CreateMessageRequest = {
  text: string;
};

export type CreateChatResponse = {
  chatId: string;
  dancerIds: string[];
  lastActivity: null;
  type: 'DIRECT';
  lastMessage: null;
};
