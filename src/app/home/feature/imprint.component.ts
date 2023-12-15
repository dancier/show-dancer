import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h1 class="page-header">Impressum</h1>
    <p><b>Angaben gemäß § 5 TMG</b></p>
    <p>
      Marc Gorzala<br />
      Theodor-Fontane-Str. 10<br />
      44339 Dortmund
    </p>
    <h2 class="sub-header">Kontakt</h2>
    <p>
      Du kannst uns
      <a class="text-link" [routerLink]="['/contact']"
        >über unser Kontaktformular</a
      >
      erreichen.
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImprintComponent {}
