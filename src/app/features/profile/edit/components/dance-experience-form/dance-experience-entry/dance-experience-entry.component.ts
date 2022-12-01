import { Component, OnInit } from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { KeyValue } from "@angular/common";
import { DanceForm } from "../dance-form.type";
import { DanceLevel, DanceRole } from "../../../../common/types/profile.types";

@Component({
  selector: 'app-dance-experience-entry',
  templateUrl: './dance-experience-entry.component.html',
  styleUrls: ['./dance-experience-entry.component.scss'],
})
export class DanceExperienceEntryComponent implements OnInit {
  danceForm!: FormGroup<DanceForm>;

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

  constructor(private formGroupDirective: FormGroupDirective) {}

  // Preserve original property order
  originalOrder = (
    a: KeyValue<any, string>,
    b: KeyValue<any, string>
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
        map((formFieldValue) => this.filterAutocompletions(formFieldValue))
      );
  }

  private filterAutocompletions(formFieldValue: string): string[] {
    const filterValue = formFieldValue.toLowerCase();
    return this.danceTypeAutocompletions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
