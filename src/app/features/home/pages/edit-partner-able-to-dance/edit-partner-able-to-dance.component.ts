import { Component, OnInit } from '@angular/core';
import { Dance } from '@features/home/pages/edit-able-to-dance/edit-able-to-dance.component';

@Component({
  selector: 'app-edit-partner-able-to-dance',
  templateUrl: './edit-partner-able-to-dance.component.html',
  styleUrls: ['./edit-partner-able-to-dance.component.scss']
})
export class EditPartnerAbleToDanceComponent{

  dummyDances: Dance[] = [{
    danceType: '',
    danceLevel: '',
    role: ''
  }];

  constructor() { }


  addDance(): void {
    this.dummyDances.push(this.createNewEmptyDance());
  }

  createNewEmptyDance(): Dance {
    return {
      danceType: '',
      danceLevel: '',
      role: ''
    }
  }

  removeDance(index: number): void {
    if (this.dummyDances.length > 1) {
      this.dummyDances.splice(index, 1);
    }
  }

}
