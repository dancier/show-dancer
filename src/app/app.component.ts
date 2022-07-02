import { Component, OnInit } from '@angular/core';
import { EventLogStorageService } from '@data/services/event-log-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public eventLogStorageService: EventLogStorageService) {}

  ngOnInit(): void {
    this.eventLogStorageService.initFromLocalStorage();
  }
}
