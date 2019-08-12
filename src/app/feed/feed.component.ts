import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatMessage } from '../../app/models/chat-message.model';
import { User } from '../../app/models/user-model';
import { Observable } from 'rxjs';
import { ChatService } from 'src/services/chat.service';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: ChatMessage[];
  constructor(private chatservice: ChatService) { }

  ngOnInit() {
    this.chatservice.getMessages().valueChanges()
      .subscribe((res)=> this.feed = res);
  }

  ngOnChanges(){

  }
}
