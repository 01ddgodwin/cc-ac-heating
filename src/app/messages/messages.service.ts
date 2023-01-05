import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../home/messages.model';

const BACKEND_URL = environment.apiURL + '/messages/';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private messages: Message[] = [];
  private messagesUpdated = new Subject<Message[]>();

  constructor(private http: HttpClient) {}

  getMessages() {
    this.http
      .get<{ message: string; messages }>(BACKEND_URL)
      .pipe(
        map((messageData) => {
          return messageData.messages.map((message) => {
            return {
              name: message.name,
              phone: message.phone,
              email: message.email,
              message: message.message,
              id: message._id,
            };
          });
        })
      )
      .subscribe((transformedMessages) => {
        this.messages = transformedMessages;
        this.messagesUpdated.next([...this.messages]);
      });
  }

  getMessageUpdateListener() {
    return this.messagesUpdated.asObservable();
  }

  deleteMessage(messageId: string) {
    this.http.delete(BACKEND_URL + messageId)
      .subscribe(() => {
        console.log("Deleted!");
        const updatedMessages = this.messages.filter((message) => message.id !== messageId);
        this.messages = updatedMessages;
        this.messagesUpdated.next([...this.messages]);
      })
  }

}
