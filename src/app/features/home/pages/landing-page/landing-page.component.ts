import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  windowHeight: number = 0;
  landingPageContentMinHeight: number = 0;
  navigationHeight = 64;
  footerHeight = 218;
  textContentHeight = 164;

  constructor() {
  }

  ngOnInit() {
    this.windowHeight = window.innerHeight;
    this.calculateLandingPageContentMinHeight();
  }

  private calculateLandingPageContentMinHeight() {
    this.landingPageContentMinHeight = this.windowHeight - this.navigationHeight - this.footerHeight - this.textContentHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.windowHeight = window.innerHeight;
    this.calculateLandingPageContentMinHeight();
  }

}
