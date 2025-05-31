import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  imports: [CommonModule],
  template: `
    <h1 class="page-header">Datenschutzerklärung</h1>
    <p>Hier schreiben wir unsere Datenschutzerklärung hin.</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyComponent {}
