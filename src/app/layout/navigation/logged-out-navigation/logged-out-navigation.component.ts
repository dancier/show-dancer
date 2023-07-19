import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-logged-out-navigation',
    templateUrl: './logged-out-navigation.component.html',
    styleUrls: ['./logged-out-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class LoggedOutNavigationComponent {}
