import { Component, OnInit } from '@angular/core';
import { EventLogService } from '@data/services/event-log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private eventLogService: EventLogService) {}

  ngOnInit(): void {
    this.eventLogService.handleInitialUserAccess();
  }
}
