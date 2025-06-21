import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

import { LoginCredentials } from '../../models/login-credentials';
import { UserDto } from '../../models/user-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private loginService = inject(LoginService)

  constructor(private router: Router ) { }

  username: string = '';
  password: string = '';

  showPassword: boolean = false;

  users: UserDto[] = [];

  loginSubmit() {
    let userCredentials: LoginCredentials = {
      username: this.username,
      password: this.password
    }

    this.loginService.login(userCredentials).subscribe({
      next: (user: UserDto) => {
      
        
        if(user.username === this.username && user.password === this.password) {
          console.log("Login successful");
          this.router.navigate(['home']);
        }
      }
    });
  }

  // private validateUser(): void {
  //   let foundUser = this.findUser();
  //   if (foundUser)
  //     this.router.navigate(['home']);
  //   else 
  //     console.error("User not found");

  // }

  private findUser(): boolean {
    let foundUser: boolean = false;
    console.log(this.username, this.password);
    
    for (const user of this.users) {
      if (user.username === this.username && user.password === this.password) {
        foundUser = true;
        break;
      }
    }
    return foundUser;
  }
}