import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router) {


  }

  ngOnInit(): void {

  }
  login(loginForm: NgForm) {

    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        // console.log(response.jwtToken);
        // console.log(response.user.role);

        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          // this.router.navigate(['/admin'])
          this.router.navigate(['/'])

        } else {
          // this.router.navigate(['/user'])
          this.router.navigate(['/'])


        }
      },
      (error: any) => {
        console.log(error)
      }
    );
    //  console.log("Submitted");
    //   console.log(loginForm.value);

  }
    registerUser() {
      this.router.navigate(['/register']);
    }
}
