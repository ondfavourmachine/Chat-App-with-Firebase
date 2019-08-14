import { Component, OnInit } from '@angular/core';
import { User } from '../../app/models/user-model';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users;
  constructor(private chatservice: ChatService) {
    this.chatservice.getUsers().subscribe(users => {
      // console.log(users);
      this.users = users;
  })
   }

  ngOnInit() {
  }

}
