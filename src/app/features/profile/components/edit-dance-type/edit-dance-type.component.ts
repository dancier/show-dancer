import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective, NonNullableFormBuilder } from '@angular/forms';
import { Dance, DanceLevel } from '@data/types/profile.types';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { KeyValue } from '@angular/common';
import { DanceForm } from '@features/profile/components/dance-type/dance-form.type';

@Component({
  selector: 'app-edit-dance-type',
  templateUrl: './edit-dance-type.component.html',
  styleUrls: ['./edit-dance-type.component.scss']
})
export class EditDanceTypeComponent implements OnInit {

  // control = new UntypedFormControl('');
  danceForm!: FormGroup<DanceForm>;

  @Output()
  danceChange = new EventEmitter<Dance>();

  // typed form
  // danceForm = this.fb.group({
  //   dance: ['', [Validators.required]],
  //   level: new FormControl<DanceLevel>('NO_EXPERIENCE', { nonNullable: true }),
  //   leading: new FormControl<DanceRole>('LEADING', { nonNullable: true }),
  // });

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

  constructor(
    private fb: NonNullableFormBuilder,
    private formGroupDirective: FormGroupDirective,
  ) {}

  ngOnInit(): void {
    this.initDanceTypeAutocompletions();
    this.danceForm = this.formGroupDirective.form;
  }

  private initDanceTypeAutocompletions(): void {
    if (!this.danceForm) {
      return;
    }
    this.filteredDanceTypeAutocompletions$ = this.danceForm.controls.type.valueChanges.pipe(
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
