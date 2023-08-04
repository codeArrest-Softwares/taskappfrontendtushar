import { Component } from '@angular/core';
import { UserServiceService } from '../services/user.service.service';
import { login, signUp } from '../data-type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showlogin: boolean = false;

  constructor(private user: UserServiceService) {}

  
  openlogin() {
    this.showlogin = !this.showlogin;
  }

  login(): void {
    const credentials = {
      username: this.username,
      password: this.password,
    };
  }
  signUp(data:signUp){
    this.user.userSignUp(data);
    
  }
  logIn(data:login){
    this.user.userLogIn(data);
  }

}
