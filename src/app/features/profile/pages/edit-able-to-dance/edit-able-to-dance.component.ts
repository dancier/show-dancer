import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '@data/services/profile.service';
import { Dance, DancePreferences } from '@data/types/profile.types';

@Component({
  selector: 'app-edit-able-to-dance',
  templateUrl: './edit-able-to-dance.html',
  styleUrls: ['./edit-able-to-dance.scss']
})
export class EditAbleToDanceComponent {

  ableTo: Dance[] = [{
    dance: undefined,
    level: undefined,
    leading: undefined
  }];

  constructor(
    public profileDataService: ProfileService,
    private router: Router
  ) {}

  addDance(): void{
    this.ableTo.push(this.createNewEmptyDance());
  }

  createNewEmptyDance(): Dance {
    return {
      dance: undefined,
      level: undefined,
      leading: undefined
    }
  }

  removeDance(index: number): void {
    if (this.ableTo.length > 1) {
      this.ableTo.splice(index, 1);
    }
  }

  submitForm(): void {
    // eslint-disable-next-line no-console
    console.log(this.ableTo)
    this.profileDataService.setOwnDances(this.ableTo as DancePreferences[]);
    this.router.navigate(['profile/initial-setup/dances-partner']);
  }
}

