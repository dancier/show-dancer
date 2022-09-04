import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Dance, DanceLevel, DanceRole } from '@data/types/profile.types';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-edit-dance-type',
  templateUrl: './edit-dance-type.component.html',
  styleUrls: ['./edit-dance-type.component.scss']
})
export class EditDanceTypeComponent implements OnInit {

  // control = new UntypedFormControl('');
  @Input() dance!: Dance;

  @Output()
  danceChange = new EventEmitter<Dance>();

  // typed form
  danceForm = this.fb.group({
    dance: ['', [Validators.required]],
    level: new FormControl<DanceLevel>('NO_EXPERIENCE', { nonNullable: true }),
    leading: new FormControl<DanceRole>('LEADING', { nonNullable: true }),
  });

  danceLevels: Record<DanceLevel, string> = {
    NO_EXPERIENCE: 'Keine',
    BASIC: 'Wenig',
    INTERMEDIATE: 'Fortgeschritten',
    ADVANCED: 'Experte',
    PRO: 'Professioneller Tänzer',
  }

  // readonly danceLevels: DanceLevel[] = [
  //   {
  //     levelValue: 'NO_EXPERIENCE',
  //     levelLabel: 'Keine Erfahrung'
  //   },
  //   {
  //     levelValue: 'BASIC',
  //     levelLabel: 'Beginner'
  //   },
  //   {
  //     levelValue: 'INTERMEDIATE',
  //     levelLabel: 'Medium'
  //   },
  //   {
  //     levelValue: 'ADVANCED',
  //     levelLabel: 'Fortschritten'
  //   },
  //   {
  //     levelValue: 'PRO',
  //     levelLabel: 'Professionell'
  //   }];

  danceTypeAutocompletions: string[] = [
    'Tango', 'Salsa', 'Standard'
  ]

  filteredDanceTypeAutocompletions$!: Observable<string[]>;
  // Preserve original property order
  originalOrder = (a: KeyValue<DanceLevel,string>, b: KeyValue<DanceLevel,string>): number => {
    return 0;
  }

  constructor(private fb: NonNullableFormBuilder) {
  }

  ngOnInit(): void {
    this.initDanceTypeAutocompletions();
  }

  private initDanceTypeAutocompletions(): void {
    this.filteredDanceTypeAutocompletions$ = this.danceForm.controls.dance.valueChanges.pipe(
      startWith(''),
      map(formFieldValue => this.filterAutocompletions(formFieldValue)),
    );
  }

  private filterAutocompletions(formFieldValue: string): string[] {
    const filterValue = formFieldValue.toLowerCase();
    return this.danceTypeAutocompletions.filter(option => option.toLowerCase().includes(filterValue));
  }

}

// export interface Level {
//   levelValue: String,
//   levelLabel: String
// }
