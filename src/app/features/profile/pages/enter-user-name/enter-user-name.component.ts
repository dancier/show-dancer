import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '@data/services/profile.service';

@Component({
  selector: 'app-enter-user-name',
  templateUrl: './enter-user-name.component.html',
  styleUrls: ['./enter-user-name.component.scss'],
})
export class EnterUserNameComponent implements OnInit {
  usernameForm!: UntypedFormGroup;
  constructor(
    public profileDataService: ProfileService,
    private fb: UntypedFormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initReactiveForm();
  }

  private initReactiveForm(): void {
    this.usernameForm = this.fb.group({
      username: ['', [Validators.required,]],
    });
  }

  public errorHandling(control: string, error: string): boolean {
    return this.usernameForm.controls[control].hasError(error);
  }

  submitForm(): void {
    if (this.usernameForm.valid) {
      this.profileDataService.setDancerName(this.usernameForm.value.username)
      this.router.navigate(['profile/initial-setup/personal-info']);
    }
  }
}
