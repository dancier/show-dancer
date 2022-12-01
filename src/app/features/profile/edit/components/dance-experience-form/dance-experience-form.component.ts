import { Component } from "@angular/core";
import { APIError } from "@shared/http/response.types";
import { FormGroup } from "@angular/forms";
import { Dance } from "../../../common/types/profile.types";
import { SimpleModelForm } from "@shared/types/forms.types";

@Component({
  selector: 'app-dance-experience-form',
  templateUrl: './dance-experience-form.component.html',
  styleUrls: ['./dance-experience-form.component.scss'],
})
export class DanceExperienceFormComponent {
  danceExperienceForm!: FormGroup<SimpleModelForm<Dance>>;

  apiError?: APIError;

  constructor() {}

  // TODO: HIER WEITERMACHEN
  // ngOnInit(): void {}
}
