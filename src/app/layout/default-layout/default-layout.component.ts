import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})

export class DefaultLayoutComponent implements OnInit {

  windowHeight: number = 0;
  pageContentMinHeight: number = 0;
  navigationHeight = 64;
  footerHeight = 218;

  constructor() { }

  ngOnInit(): void {
    this.windowHeight = window.innerHeight;
    this.calculatePageContentMinHeight();
  }

  private calculatePageContentMinHeight(): void {
    this.pageContentMinHeight = this.windowHeight - this.navigationHeight - this.footerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.windowHeight = window.innerHeight;
    this.calculatePageContentMinHeight();
  }
}
