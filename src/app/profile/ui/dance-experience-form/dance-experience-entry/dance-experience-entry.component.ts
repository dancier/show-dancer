import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  AsyncPipe,
  KeyValue,
  KeyValuePipe,
  NgFor,
  NgIf,
} from '@angular/common';
import { DanceExperienceEntryForm } from '../dance-form.type';
import {
  DanceLevel,
  DanceRole,
} from '../../../data-access/types/profile.types';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dance-experience-entry',
  templateUrl: './dance-experience-entry.component.html',
  styleUrls: ['./dance-experience-entry.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    NgFor,
    MatOptionModule,
    NgIf,
    MatSelectModule,
    AsyncPipe,
    KeyValuePipe,
  ],
})
export class DanceExperienceEntryComponent implements OnInit {
  private formGroupDirective = inject(FormGroupDirective);

  danceForm!: FormGroup<DanceExperienceEntryForm>;

  danceLevels: Record<DanceLevel, string> = {
    NO_EXPERIENCE: 'Keine',
    BASIC: 'Wenig',
    INTERMEDIATE: 'Fortgeschritten',
    ADVANCED: 'Experte',
    PRO: 'Professioneller Tänzer',
  };

  danceRoles: Record<DanceRole, string> = {
    LEAD: 'Ich führe',
    FOLLOW: 'Ich folge',
    BOTH: 'Beides',
  };

  danceTypeAutocompletions: string[] = ['Tango', 'Salsa', 'Standard'];

  filteredDanceTypeAutocompletions$!: Observable<string[]>;

  // Preserve original property order
  originalOrder = (
    _a: KeyValue<any, string>,
    _b: KeyValue<any, string>
  ): number => {
    return 0;
  };

  ngOnInit(): void {
    this.danceForm = this.formGroupDirective.form;
    this.initDanceTypeAutocompletions();
  }

  hasFieldError(field: string, error: string): boolean {
    if (this.danceForm.get(field) === null) {
      throw new Error(`Field ${field} does not exist`);
    }
    return this.danceForm.get(field)!.hasError(error);
  }

  private initDanceTypeAutocompletions(): void {
    if (!this.danceForm) {
      return;
    }
    this.filteredDanceTypeAutocompletions$ =
      this.danceForm.controls.dance.valueChanges.pipe(
        startWith(''),
        map((formFieldValue) => this.filterAutocompletions(formFieldValue!))
      );
  }

  private filterAutocompletions(formFieldValue: string): string[] {
    const filterValue = formFieldValue.toLowerCase();
    return this.danceTypeAutocompletions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
