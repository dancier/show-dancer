import { Pipe, PipeTransform } from '@angular/core';
import { Dancer } from '../types/chat.types';

@Pipe({
  name: 'city',
})
export class PartnerCityPipe implements PipeTransform {
  transform(partner: Dancer): string {
    return partner.city
  }
}
