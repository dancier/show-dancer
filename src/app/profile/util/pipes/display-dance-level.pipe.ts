import { Pipe, PipeTransform } from '@angular/core';
import { DanceLevel } from '../../data-access/types/profile.types';

@Pipe({
  name: 'displayDanceLevel',
  standalone: true,
})
export class DisplayDanceLevelPipe implements PipeTransform {
  transform(level: DanceLevel): string {
    switch (level) {
      case 'NO_EXPERIENCE':
        return 'Keine Erfahrung';
      case 'BASIC':
        return 'Einsteiger';
      case 'INTERMEDIATE':
        return 'Fortgeschritten';
      case 'ADVANCED':
        return 'Erfahren';
      case 'PRO':
        return 'Professionell';
    }
    throw new Error(`Dance Level not known: ${level}`);
  }
}
