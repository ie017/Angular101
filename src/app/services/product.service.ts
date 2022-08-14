import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root' /* Indique que ce service est se trouve dans la racine de ce projet
  alors il est disponible dans tout le projet, et donc il n'est necessaire de declarée
  a la partie providers on app.module.ts*/
})
export class ProductService {
  public productsList! : Array<any>
  constructor() {
    this.productsList = [
      {id : 15, name : "tabA", prix : 1100},
      {id : 16, name : "tabB", prix : 1900},
      {id : 17, name : "tabC", prix : 1700},
      {id : 18, name : "tabD", prix : 1850},
      {id : 19, name : "tabE", prix : 937},
    ]
  }
  public getAllProducts() : Observable<Array<any>>{ /*Cette methode retourne un objet Observable qui permet
  de faire subscribe vers la donnée productsList*/
    let random = Math.random();
    if (random < 0.7) return throwError(() => new Error("your products does not exist"));
    else return of(this.productsList)
  }
}
