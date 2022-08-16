import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Classe qui se trouve dans le module app-rooting-module.ts
    ReactiveFormsModule, /* Permit de travailler avec les reactive form on peut utiliser des objets comme
     ngSubmit, formGroup, FormBuilder ...*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
