import { Pipe, PipeTransform } from "@angular/core";
import { Gender } from "../../common/types/profile.types";

@Pipe({
  name: 'displayGender',
})
export class DisplayGenderPipe implements PipeTransform {
  transform(gender: Gender): string {
    switch (gender) {
      case 'MALE':
        return 'männlich';
      case 'FEMALE':
        return 'weiblich';
      case 'DIVERS':
        return 'divers';
      case 'NA':
        return '';
    }
    throw new Error(`Gender not known: ${gender}`);
  }
}
