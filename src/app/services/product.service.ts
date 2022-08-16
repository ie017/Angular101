import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProducts, Product} from "../model/product.model";
import {UUID} from "angular2-uuid";

@Injectable({
  providedIn: 'root' /* Indique que ce service est se trouve dans la racine de ce projet
  alors il est disponible dans tout le projet, et donc il n'est necessaire de declarée
  a la partie providers on app.module.ts*/
})
export class ProductService {
  public productsList! : Array<Product>
  constructor() { // faut back end, c'est juste pour le test
      /* For using UUD we have to install uuid from command npm i angular2-uuid*/
    this.productsList =[ ]
    for (let i = 0; i<11 ; i++){
      this.productsList.push( {id : UUID.UUID() , name : "tabA", price : 1100, promotion : false});
      this.productsList.push( {id : UUID.UUID(), name : "tabC", price : 1700, promotion : false});
      this.productsList.push( {id : UUID.UUID(), name : "tabD", price : 1850, promotion : true});
      this.productsList.push( {id : UUID.UUID(), name : "tabB", price : 1900, promotion : true});
      this.productsList.push( {id : UUID.UUID(), name : "tabE", price : 937, promotion : false});
    }
  }
  public getAllProducts() : Observable<Array<any>>{ /*Cette methode retourne un objet Observable qui permet
  de faire subscribe vers la donnée productsList*/
    let random = Math.random();
    if (random < 0.1) return throwError(() => new Error("your products does not exist"));
    else return of(this.productsList)
  }
  public getPageProducts( page : number, size : number) : Observable<PageProducts>{
    // for example we have size equal 5 and page equal 2 and totalpages equal 6 and totals product is 31
    let index = page *size; // index is the first element in the page 2 and his range in table product is 2 * 5 = 10
    let totalPages = ~~(this.productsList.length/size); // number of values' table / size give the total's pages.
    if (totalPages % size != 0){
      /*if the rest is not zero than we have to add 1 to totalPages like our
      exemple 21 elements / size = 5 give 5 page but that's not enough put totalpages equal 6*/
      totalPages++;
    }
    let pageProducts = this.productsList.slice(index, index+size);/* List returned start in the
     range index in productsList and end in index + size in the same table productsList, in our
     example start in 10 and end in 15 of ranges of productsList*/
    return of({page : page, totalPages : totalPages, products : pageProducts, size : size});
  }
  public deleteProduct(id : string) : Observable<boolean>{
    this.productsList = this.productsList.filter(p => p.id != id); /*The filter() method creates a new array with
    all elements that pass the test implemented by the provided function.*/
    return of(true);
  }
  public setpromotion(id : string) : Observable<boolean>{
    let product = this.productsList.find(p => p.id == id);
    if (product != undefined){
      product.promotion =!product.promotion;
      return of(true);
    } else {
      return throwError(()=> new Error("your products does not exist"));
    }
  }
  public saerchProduct(keyword : string, page : number, size : number) : Observable<PageProducts>{
    let listProducts = this.productsList.filter(p => p.name.includes(keyword)); /* Search  about all products
    with the same keyword*/
    let index = page * size;
    let totalPages = ~~(listProducts.length/size);
    if (totalPages%size != 0){
      totalPages++;
    }
    let pageProducts = listProducts.slice(index, index+size);
    return of({page : page, totalPages : totalPages, products : pageProducts, size : size});
  }
}
