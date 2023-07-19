import { Pipe, PipeTransform } from '@angular/core';
import { DanceRole } from '../../common/types/profile.types';

@Pipe({
    name: 'displayDanceRole',
    standalone: true,
})
export class DisplayDanceRolePipe implements PipeTransform {
  transform(role: DanceRole): string {
    switch (role) {
      case 'FOLLOW':
        return 'folgend';
      case 'LEAD':
        return 'führend';
      case 'BOTH':
        return 'Sowohl folgend als auch führend';
    }
    throw new Error(`Dance Role not known: ${role}`);
  }
}
