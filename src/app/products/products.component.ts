import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";

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
  constructor(private productService : ProductService) { }

  ngOnInit(): void { /* ngOnInit est la methode qui c'est exécute a chaque demarrage de server de angular*/
    this.product = [
      {id: 1, name: "PhoneA", prix: 600},
      {id: 2, name: "PhoneB", prix: 900},
      {id: 3, name: "PhoneC", prix: 700},
      {id: 4, name: "PhoneD", prix: 850},
      {id: 5, name: "PhoneE", prix: 1100},
    ]
    /* Next step we move to treatment our data in service not in component */
    /* For this step we start by using ng generate service services/product */
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
  DeleteProduct(p: any) { /* Function qui permet de supprimer le specifique element dans le tableau products*/
    /* Une fois de supprission de tout les elements de ce tableau et lorsque
     on a fait une refreche a la page toutes les elements récuperer car l'objet ngOnInit()*/
    let index = this.product.indexOf(p);
    this.product.splice(index,1);
  }
}
