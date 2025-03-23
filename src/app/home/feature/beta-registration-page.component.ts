import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-beta-registration-page',
  template: `
    <div class="beta-registration-outer-container background-color-accent-A200">
      <div class="beta-registration-inner-container container-radius">
        <div class="beta-registration-info">
          <h2 class="font-color-primary-800">
            Helf uns eine Tanz-Community zu gründen!
          </h2>
        </div>
        <div class="beta-registration-form">
          <p>
            Wir bauen im Moment eine Tanz-Community auf, die dabei hilft,
            passende Tanzpartner zu finden.
          </p>
          <p>
            Hinterlass deine Mail-Adresse, werden wir mit dir Kontakt aufnehmen
            und gerne erne hören wir deine Meinungen oder Vorstellungen
          </p>
          <p class="label">
            Ich möchte gerne Mitglied des Tanz-Communitys werden!
          </p>
          <mat-card-content class="card-content-container" fxLayout="column">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>E-Mail</mat-label>
              <input matInput placeholder="(Deine Mail-Adresse)" type="email" />
            </mat-form-field>
            <button class="font-color-primary-800" mat-raised-button>
              Ich bin dabei!
            </button>
          </mat-card-content>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .beta-registration-outer-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      .beta-registration-inner-container {
        max-width: 800px;
        height: 100%;
        padding: 32px;
        background-color: white;
      }

      .beta-registration-form {
        h3 {
          margin-top: 32px;
        }

        .label {
          display: block;
          margin-bottom: 16px;
        }

        button {
          margin-top: 32px;
        }
      }
    `,
  ],
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class BetaRegistrationPageComponent {
  constructor() {}
}
