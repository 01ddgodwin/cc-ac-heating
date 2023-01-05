import { Component, OnInit } from '@angular/core';
import { Message } from '../home/messages.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  storedMessages: Message[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
