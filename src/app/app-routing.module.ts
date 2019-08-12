import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { ChatroomComponent } from './chatroom/chatroom.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'signUp', component: SignupFormComponent },
    { path: 'chat', component: ChatroomComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}