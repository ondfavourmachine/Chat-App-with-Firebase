import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';
import { ChatMessage } from '../app/models/chat-message.model';
import { User } from '../app/models/user-model'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
 user: any;
 chatMessages: AngularFireList<ChatMessage>;
 chatMessage: ChatMessage;
 userName: string;

  constructor( private db: AngularFireDatabase,
               private afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(auth =>{
        if(auth !== undefined && auth !== null){
          this.user = auth;
        }
      })
     }

  sendMessage(msg: string){
    const timeStamp = this.getTimeStamp();
    const email = "test@text.com";
    this.chatMessages = this.getMessages();
    console.log(timeStamp);
    this.chatMessages.push({
      message: msg,
      timeSent: timeStamp,
      userName: 'test-user',
      email: email
    })
    this.chatMessages.valueChanges().subscribe(res => console.log(res));
  }


  getTimeStamp(): string | Date{
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds()
    return  new Date(`${date} ${time}`).toLocaleString();
  }


  getMessages(): AngularFireList<ChatMessage>{
      // create message feed database
    return this.db.list('message', (ref) => ref.limitToLast(25))
  }
}
