import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from './messages.model';

const BACKEND_URL = environment.apiURL + "/messages/"

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private messages: Message [] = []
  private messagesUpdated = new Subject<Message[]>();
  private url = "";

  constructor(private http: HttpClient) { }

  addMessage(messages: Message) {
    const message: Message = {
      id: messages.id,
      name: messages.name,
      phone: messages.phone,
      email: messages.email,
      message: messages.message
    };

    this.http.post<{message: string; messageId: string}>(
      BACKEND_URL,
      message
    ).subscribe((responseData) => {
      const id = responseData.messageId;
      message.id = id;
      this.messages.push(message);
      this.messagesUpdated.next([...this.messages]);
    }) 
  }

}
