import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AuthenticationGuard } from './guards/authentication.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  {
    path: 'admin',
    component: AdminTemplateComponent,
    //canActivate: [AuthenticationGuard],
    children: [
      { path: 'editProduct/:id', component: EditProductComponent },
      { path: 'addProduct', component: NewProductComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'customers', component: CustomersComponent }
    ]
  }
];

