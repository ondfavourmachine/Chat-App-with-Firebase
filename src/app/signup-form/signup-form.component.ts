import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  email: string;
  password: string;
  displayName: string;
  errorMsg: string;

  constructor(private authservice: AuthService,
            private router: Router) { }

  ngOnInit() {
  }


  signUp(){
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;
    
    // console.log(displayName, password, email);
    this.authservice.signUp(email, password, displayName)
      .then(res => this.router.navigate(['chat']))
      .catch(error => this.errorMsg = error.message );
  }
}


// 