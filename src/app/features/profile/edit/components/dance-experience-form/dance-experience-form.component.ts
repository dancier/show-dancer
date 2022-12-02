import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { DanceLevel, DanceRole, DanceType } from "../../../common/types/profile.types";
import { ProfileService } from "../../../common/services/profile.service";
import { Router } from "@angular/router";
import { DanceExperienceEntryForm } from "./dance-form.type";

@Component({
  selector: 'app-dance-experience-form',
  templateUrl: './dance-experience-form.component.html',
  styleUrls: ['./dance-experience-form.component.scss'],
})
export class DanceExperienceFormComponent implements OnInit {
  danceExperiences = new FormArray<FormGroup<DanceExperienceEntryForm>>([]);

  // TODO: wir müssen irgendwie die Infos aus dem Profile Service bekommen und hier reinreichen
  // TODO: vllt von außen reinreichen hier reinreichen als input?

  constructor(
    public profileService: ProfileService,
    private router: Router,
    private formGroupDirective: FormGroupDirective
  ) {}

  ngOnInit(): void {
    this.formGroupDirective.form.addControl('dances', this.danceExperiences);
    this.addDance();
  }

  addDance(): void {
    const danceForm = new FormGroup<DanceExperienceEntryForm>({
      dance: new FormControl<DanceType>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      leading: new FormControl<DanceRole>('LEAD', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      level: new FormControl<DanceLevel>('BASIC', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
    this.danceExperiences.push(danceForm);
  }

  removeDance(index: number): void {
    if (this.danceExperiences.length > 0) {
      this.danceExperiences.removeAt(index);
    }
  }
}
