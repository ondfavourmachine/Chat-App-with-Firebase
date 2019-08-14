import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
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
 user: firebase.User;
 chatMessages: AngularFireList<ChatMessage>;
 chatMessage: ChatMessage;
 userName: string;

  constructor( private db: AngularFireDatabase,
               private afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(auth =>{
        if(auth !== undefined && auth !== null){
          this.user = auth;
        }
        this.getUser().subscribe(a => {
          // console.log(a);
          this.userName = a.displayName
        })
      })
     }

     // send message
  sendMessage(msg: string){
    const timeStamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timeStamp,
      userName: this.userName,
      email: email
    })
    // this.chatMessages.valueChanges().subscribe(res => console.log(res));
  }


  // get the time of message
  getTimeStamp(): string | Date{
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds()
    return  new Date(`${date} ${time}`).toLocaleString();
  }

  // get all messages from firebase
  getMessages(): AngularFireList<ChatMessage>{
      // create message feed database
    return this.db.list('message', (ref) => ref.limitToLast(25))
  }


  // get a user from list of registered users
  getUser(): Observable<any>{
    const userId = this.user.uid;
    const path = `/user/${userId}`;
    return this.db.object(path).valueChanges();
  }


  // get all users
  getUsers(): Observable<any>{
    // const userId = this.user.uid;
    const path = `/user`;
    return this.db.list(path).valueChanges()
  }
}
