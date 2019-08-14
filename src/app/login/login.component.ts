import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errorMsg: string;
  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit() {
  }


  login() {
   
    this.authservice.login(this.email, this.password)
    .catch(error => this.errorMsg = error.message);
  }
}
