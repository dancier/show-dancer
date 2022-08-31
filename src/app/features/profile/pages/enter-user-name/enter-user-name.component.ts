import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileHttpService } from '@data/services/profile-http.service';
import { ProfileService } from '@data/services/profile.service';
import { APIError } from '@data/types/response.types';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-enter-user-name',
  templateUrl: './enter-user-name.component.html',
  styleUrls: ['./enter-user-name.component.scss'],
})
export class EnterUserNameComponent implements OnInit {
  usernameForm!: UntypedFormGroup;
  error?: APIError;
  
  constructor(
    public profileDataService: ProfileService,
    private profileHttpService: ProfileHttpService,
    private fb: UntypedFormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initReactiveForm();
  }

  private initReactiveForm(): void {
    this.usernameForm = this.fb.group({
      username: ['', [Validators.required]],
    });
  }

  public errorHandling(control: string, error: string): boolean {
    return this.usernameForm.controls[control].hasError(error);
  }

  submitForm(): void {
    if (this.usernameForm.valid) {
      const username = this.usernameForm.value.username;
      this.profileHttpService
        .checkNameAvailability$(username)
        .subscribe((response) => {
          if (response.isSuccess) {
            this.profileDataService.setDancerName(username);
            this.router.navigate(['profile/initial-setup/personal-info']);
          } else {
            this.error = response.error;
          }
        });
    }
  }
}
