import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { ChatMessage } from '../models/chat-message.model'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
@Input() chatMessageFromFeed: ChatMessage;
userEmail: string;
userName: string;
messageContent: string | string[];
timeStamp: string | Date;
  constructor(
    private authservice: AuthService,
    private chatservice: ChatService
  ) { }

  ngOnInit() {
    this.messageContent = this.chatMessageFromFeed.message;
    this.timeStamp = this.chatMessageFromFeed.timeSent;
    this.userEmail = this.chatMessageFromFeed.email;
    this.userName = this.chatMessageFromFeed.userName;
  }

}
