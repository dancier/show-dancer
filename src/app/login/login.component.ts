import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { OidcProvider } from './oidcProvider';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  oidcProvider: OidcProvider[] = [];

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.loginService.get().subscribe((oidc) => (this.oidcProvider = oidc));
  }
}
