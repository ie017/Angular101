import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Product } from '../model/product.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
