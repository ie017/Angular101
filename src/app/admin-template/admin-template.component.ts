import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {Product} from "../model/product.model";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {

  constructor(public authService : AuthenticationService, private router : Router) { }

  ngOnInit(): void {
  }

  doLogout() {
    this.authService.logout().subscribe({
      next : (data)=>{
        this.router.navigateByUrl("/login");
      }
    });
  }
}
