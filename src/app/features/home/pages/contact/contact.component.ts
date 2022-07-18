import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '@data/services/contact.service';
import { ContactResponse } from '@data/types/contact.types';
import { Subscription } from 'rxjs';
import { AuthStorageService } from '@data/services/auth-storage.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  contactResponse: ContactResponse | undefined;
  contactServiceSub: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    public authStorageService: AuthStorageService,
  ) { }

  ngOnInit(): void {
    this.initReactiveForm();
  }

  ngOnDestroy(): void {
    this.contactServiceSub?.unsubscribe();
  }

  private initReactiveForm(): void {
    this.contactForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.email]],
    });
  }

  submitForm(): void {
    if (this.contactForm.valid) {
      const { message, email } = this.contactForm.value;

      this.contactServiceSub = this.contactService
        .sendMessage(message, email)
        .subscribe((response) => {
          this.contactResponse = response;
        });
    }
  }

}
