import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productFormGroups! : FormGroup;

  constructor(private fb: FormBuilder, public productService : ProductService) {
  }

  ngOnInit(): void {
    this.productFormGroups = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      /* Validators.required mean obligation put the value in the input*/
      /* Validators.minLength(4) mean you should put 4 words at least */
      /* You should put the validators in one table [] called validators's table*/
      price: this.fb.control(null, [Validators.required, Validators.min(150)]),
      promotion: this.fb.control(true, [Validators.required]),
    });
  }

  addNewProduct() {
    let product = this.productFormGroups.value;
    this.productService.productInDb(product).subscribe({
      next : () => {
        alert('Your product has been added');
        this.productFormGroups.reset();
      },
      error : err => console.log(err)
    })
  }
}
