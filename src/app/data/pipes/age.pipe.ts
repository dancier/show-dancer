import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(birthdate?: string): number | string {
    return birthdate ? calculateAge(birthdate) : 'unknown';
  }
}

function calculateAge(birthdate: string): number | string {
  try {
    const ageInMilliseconds = Date.now() - Date.parse(birthdate);
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365);
  } catch (error) {
    console.error('Error oin parsing birthdate', error);
    return 'unknown';
  }
}
