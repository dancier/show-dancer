import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
  standalone: true,
})
export class AgePipe implements PipeTransform {
  transform(birthdate?: string): number | string {
    return birthdate ? calculateAge(birthdate) : 'unknown';
  }
}

function calculateAge(birthdate: string): number | string {
  const birthdateAsDate = new Date(birthdate);
  if (birthdateAsDate.toString() === 'Invalid Date') {
    console.error('Error on parsing birthdate', birthdate);
    return 'unknown';
  }

  // calculating the age this way is taking leap years into account
  let age = new Date().getFullYear() - birthdateAsDate.getFullYear();
  const monthDifference = new Date().getMonth() - birthdateAsDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && new Date().getDate() < birthdateAsDate.getDate())
  ) {
    age--;
  }
  return age;
}
