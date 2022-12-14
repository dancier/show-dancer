import { Pipe, PipeTransform } from '@angular/core';
import { Chat, Dancer } from '../types/chat.types';

@Pipe({
  name: 'name',
})
export class PartnerNamePipe implements PipeTransform {
  transform(partner: Dancer): string {
    return partner.dancerName
  }

}
