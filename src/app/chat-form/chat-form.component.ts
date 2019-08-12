import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/services/chat.service';



@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message: string;
  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  sendChat(){
    this.chatService.sendMessage(this.message);
  }


  submit(evt: KeyboardEvent){
    if(evt.keyCode === 13){
      this.sendChat();
      this.message = '';
      
    }
    return
  }
}
