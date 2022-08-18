import { Component, OnInit } from '@angular/core';
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productID! : string;
  product! : Product;
  productFormGroup! : FormGroup;
  constructor(private route : ActivatedRoute, public productService : ProductService,
              private  fb : FormBuilder) {
   this.productID = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productID).subscribe({
      next : (product)=>{
        this.product = product;
        this.productFormGroup = this.fb.group({
          name: this.fb.control(product.name, [Validators.required, Validators.minLength(4)]),
          price: this.fb.control(product.price, [Validators.required, Validators.min(150)]),
          promotion: this.fb.control(product.promotion, [Validators.required]),
        });
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }

  editProduct() {
    let product = this.productFormGroup.value;
    product.id = this.productID;
    this.productService.updateProduct(product).subscribe({
      next : ()=>{
        alert('Your product is updated')
      },
      error : (err)=> {console.log(err);}
    });

  }
}
