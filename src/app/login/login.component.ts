import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userFormGroup! : FormGroup;
  errorMessage! : any;
  constructor(private fb : FormBuilder, private  authService : AuthenticationService
  , private route : Router) { }

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      username : this.fb.control(null),
      password : this.fb.control(null),
    })
  }

  doLogin() {
    let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;
    this.authService.login(username, password).subscribe({
      next : (users) => {
        this.authService.authenticate_User(users).subscribe({
          next : (data)=>{
            this.route.navigateByUrl('/admin');
          }
        });
      },
      error : (err)=>{
        this.errorMessage = err;
      }
    })
  }
}
