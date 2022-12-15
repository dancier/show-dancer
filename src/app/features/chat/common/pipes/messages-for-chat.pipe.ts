import { Pipe, PipeTransform } from '@angular/core';
import { Chat, ChatMessage, MessagesByChatMap } from '../types/chat.types';

@Pipe({
  name: 'messagesForChat',
})
export class MessagesForChatPipe implements PipeTransform {
  transform(messagesByChat: MessagesByChatMap, chat: Chat | null): ChatMessage[] {
    return (chat === null) ? [] : messagesByChat[chat.chatId];
  }

}
