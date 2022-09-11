import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '@data/services/profile.service';
import { Dance } from '@data/types/profile.types';

@Component({
  selector: 'app-edit-able-to-dance',
  templateUrl: './edit-able-to-dance.component.html',
  styleUrls: ['./edit-able-to-dance.component.scss']
})
export class EditAbleToDanceComponent {

  ableTo: Dance[] = [{
    type: undefined,
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
      type: undefined,
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
    this.profileDataService.setOwnDances(this.ableTo as Dance[]);
    this.router.navigate(['profile/initial-setup/dances-partner']);
  }
}

