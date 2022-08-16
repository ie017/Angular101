/*We start by using the type of product and replace any in our array by this type array<any> ==> array<product>*/
export interface Product{
  id : string,/* Change the type of id from number to string because uud is a string */
  name : string,
  price : number,
  promotion : boolean,
}
/* UUID is a package that allowed to generate id he has only & has a type string*/

/* Now we have to create the pagination and for that we should create a new interface*/
export interface PageProducts{
  products : Product[]; /* Or Array<Product>*/
  size : number;
  page : number;
  totalPages : number;
}
