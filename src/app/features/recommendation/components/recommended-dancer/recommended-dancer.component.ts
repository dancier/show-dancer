import { Component, Input } from '@angular/core';
import { RecommendedDancer } from '../../types/recommended-dancers.types';

@Component({
  selector: 'app-recommended-dancer',
  templateUrl: './recommended-dancer.component.html',
  styleUrls: ['./recommended-dancer.component.scss'],
})
export class RecommendedDancerComponent {
  // TODO: make input
  @Input()
  dancer!: RecommendedDancer;

  // dancer: RecommendedDancer = {
  //   id: '1',
  //   name: 'John Doe',
  //   imageHash: 'QmVjYXVzZS1pbWFnZS1oYXNo',
  //   about: 'I am a dancer',
  //   age: 30,
  //   zip: '12345',
  //   city: 'Berlin',
  //   dances: ['Salsa', 'Bachata'],
  //   score: 0.5,
  // };

  constructor() {}
}
