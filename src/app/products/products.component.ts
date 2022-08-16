import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {filter} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  product! : Array<any> /* L'opérateur d'assertion non nul (!)
  indique au compilateur TypeScript qu'une valeur
  typée en option ne peut pas être nulle ou indéfinie*/
  /*Public est l'encapsulation par defaut de chaque variable*/
  productsList! : Array<any>
  errormessage! : string;
  searchFormGroup! : FormGroup;
  currentPage : number=0;
  sizePage : number=6;
  totalPages : number=0;
  currentAction : string="All"
  constructor(private productService : ProductService, private fb : FormBuilder) { }

  ngOnInit(): void { /* ngOnInit est la methode qui c'est exécute a chaque demarrage de server de angular*/
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control(null),
    })
    /* this.product = [
      {id: 1, name: "PhoneA", price: 600, promotion : true},
      {id: 2, name: "PhoneB", price: 900, promotion : false},
      {id: 3, name: "PhoneC", price: 700, promotion : true},
      {id: 4, name: "PhoneD", price: 850, promotion : false},
      {id: 5, name: "PhoneE", price: 1100, promotion : true},
    ] */
    /* Next step we move to treatment our data in service not in component */
    /* For this step we start by using ng generate service services/product */
    this.getPageProduct();
  }
  getAllProduct(){
    this.productService.getAllProducts().subscribe({ /* Je fait un subscribe
     par l'element subscribe si il y'a des resultats il doit recuperer les données
     avec la fonction data apres l'elemnt next sinon il doit return un message d'erreur
     après l'element error */
      next : (data) => {
        this.productsList = data;
      },
      error : (err) => {
        this.errormessage = err;
      }
    });
  }
  getPageProduct() {
    this.productService.getPageProducts(this.currentPage, this.sizePage).subscribe({
      next: (data) => {
        this.productsList = data.products;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        this.errormessage = err;
      }
    });
  }
  /* We have two methods DeleteProduct for the first table define in ngOnInit of porducts.component.ts

  < To make a structural work we need to make tha part of service to defiine all of we need like make
   the products by using the constructors and declare all methods we need after that we can do the calls from components>

  and the other is deleteProdcut for delete the table's product define in part of service, We use the pattern Observable*/
  DeleteProduct(p: any) { /* Function qui permet de supprimer le specifique element dans le tableau products*/
    /* Une fois de supprission de tout les elements de ce tableau et lorsque
     on a fait une refreche a la page toutes les elements récuperer car l'objet ngOnInit()*/
    let index = this.product.indexOf(p);
    this.product.splice(index,1);
  }
  public deleteProdcut(p : Product){
    this.productService.deleteProduct(p.id).subscribe({
      next : (data) =>{
        this.getAllProduct(); /*The problem here is everytime I delete the product I do the call
         to the service by using Observable and in the service we start to making a new table contains all the product
          except the deleted product after that redisplay this table by using this.getAllProduct() and that is real the problem*/

        /*The new vision is delete the product without make other table of the rest products so check the new method deleteProdcuts*/
      }
    })
  }
  public deleteProdcuts(p : Product){
    let confirmation = confirm("Are you sure?");
    if (confirmation == false) return; /* if: there is confirmation follow up, if not: keep display data*/
    this.productService.deleteProduct(p.id).subscribe({
      next : (data) =>{
        let index = this.productsList.indexOf(p);
        this.productsList.splice(index,1);
      }
    })
  }
  changePromotion(p : Product){
    this.productService.setpromotion(p.id).subscribe({
      next : (data) => {
        console.log("OK")
      },
      error : (err) =>{
        this.errormessage = err;
      }
    })
  }

  doSearchProducts() {
    this.currentAction = "search";
    let keyword = this.searchFormGroup.value.keyword; // acces to the value of keyword and save it
    this.productService.saerchProduct(keyword,this.currentPage,this.sizePage).subscribe({
      /* Do call to the method saerchProduct of productService with the parameter keyword*/
      next : (data)=> {
        // if the data is geted with non problem we have to save it in productsList as value.
        this.productsList = data.products;
        this.totalPages = data.totalPages;
      }
    })
  }

  getPage(i: number) {
    this.currentPage = i;
    if (this.currentAction == 'All')
      this.getPageProduct();
    else
      this.doSearchProducts();
  }
}
