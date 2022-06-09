import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})

export class LandingPageComponent implements OnInit {

  windowHeight: number = 0;
  landingPageContentMinHeight: number = 0;
  navigationHeight = 64;
  footerHeight = 218;
  textContentHeight = 64;

  constructor() {
  }

  ngOnInit(): void {
    this.windowHeight = window.innerHeight;
    this.calculateLandingPageContentMinHeight();
  }

  private calculateLandingPageContentMinHeight(): void {
    this.landingPageContentMinHeight = this.windowHeight - this.navigationHeight - this.footerHeight - this.textContentHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.windowHeight = window.innerHeight;
    this.calculateLandingPageContentMinHeight();
  }

}
