import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-edit-dance-type',
  templateUrl: './edit-dance-type.component.html',
  styleUrls: ['./edit-dance-type.component.scss']
})
export class EditDanceTypeComponent implements OnInit {

  control = new UntypedFormControl('');

  readonly danceLevels: Level[] = [
    {
      levelValue: 'NO_EXPERIENCE',
      levelLabel: 'Keine Erfahrung'
    },
    {
      levelValue: 'BASIC',
      levelLabel: 'Beginner'
    },
    {
      levelValue: 'INTERMEDIATE',
      levelLabel: 'Medium'
    },
    {
      levelValue: 'ADVANCED',
      levelLabel: 'Fortschritten'
    },
    {
      levelValue: 'PRO',
      levelLabel: 'Professionell'
    }];

  danceTypes: string[] = [
    'Tango', 'Salsa', 'Standard'
  ]

  filteredDanceTypes$!: Observable<string[]>;

  constructor() {
  }

  ngOnInit(): void {
    this.filteredDanceTypes$ = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.danceTypes.filter(option => option.toLowerCase().includes(filterValue));
  }

}


export interface Level {
  levelValue: String,
  levelLabel: String
}
