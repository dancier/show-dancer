import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-modern-layout',
  templateUrl: './modern-layout.component.html',
  styleUrls: ['./modern-layout.component.scss'],
  imports: [NavigationComponent, RouterOutlet, FooterComponent],
})
export class ModernLayoutComponent {
  constructor() {}
}
