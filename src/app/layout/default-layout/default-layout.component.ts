import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {

  windowHeight: number = 0;
  pageContentMinHeight: number = 0;
  navigationHeight = 64;
  footerHeight = 218;

  constructor() { }

  ngOnInit() {
    this.windowHeight = window.innerHeight;
    this.calculatePageContentMinHeight();
  }

  private calculatePageContentMinHeight() {
    this.pageContentMinHeight = this.windowHeight - this.navigationHeight - this.footerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.windowHeight = window.innerHeight;
    this.calculatePageContentMinHeight();
  }
}
