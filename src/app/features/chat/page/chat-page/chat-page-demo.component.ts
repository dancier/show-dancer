import {
  ChangeDetectionStrategy,
  Component,
  inject,
  NgZone,
} from '@angular/core';
import { ChatDto } from '../../common/types/chat.types';
import { ChatServiceDemoService } from './chat-service-demo.service';
import any = jasmine.any;

@Component({
  selector: 'app-chat-page-demo',
  standalone: true,
  imports: [],
  providers: [],
  template: `
    <p>chat-page-demo works!</p>
    <p>1</p>
    <!--    <button data-testid="emit-btn"style="display: none;" (click)="handleClick(e)>-->
    <!--      Click me to emit-->
    <!--    </button>-->
    <!--    <p>Value from Demo 1: {{ chats.length }}</p>-->
    <p>Value from Demo: {{ demoService2.chats().length }}</p>
    <!--    <p>Value from Actual: {{ actualService.demoValue }}</p>-->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageDemoComponent {
  chats: ChatDto[] = [];
  // demoService = inject(ChatHttpService);
  demoService2 = inject(ChatServiceDemoService);
  // service = inject(ChatStateSignalsService);

  // demoValue = this.demoService.getChats$().subscribe((value) => {
  //   console.log('chats', value);
  //   this.chats = value;
  // });

  // actualService = inject(ChatStateSignalsService);

  constructor(private zone: NgZone) {
    // @ts-ignore
    window['demoService'] = this.demoService2;
    // @ts-ignore
    window['emitChats'] = () => {
      this.zone.run(() => {
        this.demoService2.valueSubject.next(0);
      });
    };
  }

  handleClick(_e: Event): void {
    console.log('handleClick');
    this.demoService2.valueSubject.next(2);
  }
}
