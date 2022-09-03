import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '@data/services/profile.service';
import { Dance, DancePreferences } from '@data/types/profile.types';

@Component({
  selector: 'app-edit-partner-able-to-dance',
  templateUrl: './edit-partner-able-to-dance.component.html',
  styleUrls: ['./edit-partner-able-to-dance.component.scss']
})
export class EditPartnerAbleToDanceComponent{

  wantsTo: Dance[] = [{
    dance: undefined,
    level: undefined,
    leading: undefined
  }];

  constructor(
    public profileDataService: ProfileService,
    private router: Router
  ) { }

  addDance(): void {
    this.wantsTo.push(this.createNewEmptyDance());
  }

  createNewEmptyDance(): Dance {
    return {
      dance: undefined,
      level: undefined,
      leading: undefined
    }
  }

  removeDance(index: number): void {
    if (this.wantsTo.length > 1) {
      this.wantsTo.splice(index, 1);
    }
  }
  submitForm(): void {
    this.profileDataService.setPartnerDances(this.wantsTo as DancePreferences[]);
    this.profileDataService.updateProfile()
    this.router.navigate(['profile'])
  }
}
