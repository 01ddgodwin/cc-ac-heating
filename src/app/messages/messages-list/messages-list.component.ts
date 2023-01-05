import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/home/messages.model';
import { Subscription } from 'rxjs';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})
export class MessagesListComponent implements OnInit {
  isLoading = false;

  @Input() messages: Message[] = [];
  private messagesSub!: Subscription;

  constructor(public messagesService: MessagesService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.messagesService.getMessages();
    console.log("Messages got")
    this.messagesSub = this.messagesService
      .getMessageUpdateListener()
      .subscribe((messages: Message[]) => {
        this.isLoading = false;
        this.messages = messages;
      });
  }

  onDelete(messageId: string) {
    this.messagesService.deleteMessage(messageId);
  }

}
