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
  const birthdateAsDate = Date.parse(birthdate);
  if (isNaN(birthdateAsDate)) {
    console.error('Error on parsing birthdate');
    return 'unknown';
  }

  // TODO: calculation isn't exact because of leap years which have 366 days
  // TODO: the exact calculation is a bit complicated, see https://stackoverflow.com/a/16436459
  // TODO: we could use day.js for this
  const ageInMilliseconds = Date.now() - birthdateAsDate;
  return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365);
}
