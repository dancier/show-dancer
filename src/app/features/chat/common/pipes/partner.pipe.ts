import { Pipe, PipeTransform } from '@angular/core';
import { Chat, Dancer, DancerId, DancerMap } from '../types/chat.types';

@Pipe({
  name: 'partner',
})
export class PartnerPipe implements PipeTransform {
  transform(chat: Chat, ownId: DancerId, dancers: DancerMap): Dancer {
    return this.getPartner(chat, ownId, dancers);
  }

  getPartner(chat: Chat, ownId: DancerId, dancers: DancerMap): Dancer {
    let partnerId = chat.dancerIds.find((id) => id !== ownId);
    if (partnerId === undefined) {
      return {
        id: 'Unbekannt',
        city: 'Unbekannt',
        dancerName: 'Unbekannt'
      };
    }
    return dancers[partnerId];
  }
}
