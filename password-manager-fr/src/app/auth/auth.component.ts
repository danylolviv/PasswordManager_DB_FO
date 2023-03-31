import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode = true;
  username: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.isLoginMode) {
      this.authService.login(this.username, this.password)
        .subscribe(
            (result: any) => {
            if (result) {
              this.router.navigate(['/dashboard']);
            }
          },
            (error: any) => console.log(error)
        );
    } else {
      this.authService.register(this.username, this.password, this.confirmPassword)
        .subscribe(
            (result: any) => {
            if (result) {
              this.router.navigate(['/dashboard']);
            }
          },
            (error: any) => console.log(error)
        );
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
