import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from '../app/models/user-model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.user = this.afAuth.authState;
   }

   get currentUserId(): string{
     return this.authState !== null ? this.authState.uid : ''
   }


   login(email: string, password: string): Promise<any>{

      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
                .then(res => {
                  const status = 'online';
                  this.setUserStatus(status);
                  this.router.navigate(['chat'])
                }) 
   }

  signUp(email: string, password: string, displayName: string): Promise<any>{

    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
              .then((user) =>{
                  this.authState = user;
                  const status = 'online';
                  this.setUserData(email, displayName, status);
              }).catch(error => console.log(error))
  }


  setUserData(useremail: string, displayName: string, status: string): void{
    const path = `user/${this.currentUserId}`;
    const data = {
      email: useremail,
      displayName: displayName,
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error))

  }


  setUserStatus(status: string){
    const path = `users/${this.currentUserId}`;
    const data = {
      status: status,
    }
  }
}
