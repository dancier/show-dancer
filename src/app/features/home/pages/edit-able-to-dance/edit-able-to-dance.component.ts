import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-able-to-dance',
  templateUrl: './edit-able-to-dance.html',
  styleUrls: ['./edit-able-to-dance.scss']
})
export class EditAbleToDanceComponent {

  dummyDances: Dance[] = [{
    danceType: '',
    danceLevel: '',
    role: ''
  }];

  constructor() {
  }


  addDance(): void{
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

export interface Dance {
  danceType: string,
  danceLevel: string,
  role: string
}

