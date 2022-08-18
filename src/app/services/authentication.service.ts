import { Injectable } from '@angular/core';
import {Users} from "../model/user.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  usersList : Users[]=[]
  authenticateUser : Users | undefined;

  constructor() {
    this.usersList.push({id : UUID.UUID(), username : "User1", password : "1234", roles : ["USER"]}),
    this.usersList.push({id : UUID.UUID(), username : "User2", password : "1234", roles : ["USER","ADMIN"]}),
    this.usersList.push({id : UUID.UUID(), username : "User3", password : "1234", roles : ["USER"]})
  }
  public login(username : string, password : string) : Observable<Users>{
    let ourUser = this.usersList.find(u => u.username == username);
    if (!ourUser) return throwError(()=> new Error("User not found "));
    if (ourUser.password != password){
      return throwError(() => new Error("Bad credentials"))
    }
    return of(ourUser);
  }

  public authenticate_User(ourUser : Users): Observable<boolean>{
    this.authenticateUser = ourUser;
    localStorage.setItem("authUser", JSON.stringify({username : ourUser.username,roles : ourUser.roles, JWT : "JWT_TOKEN"}));
    return of(true);
  }
  public hasRole(role : string) : boolean {
    return this.authenticateUser!.roles?.includes(role); /* ! mean this methode hasRole
    should not return type undefined*/
  }
  public isAuthenticated(){
    return this.authenticateUser!=undefined;
  }
  public logout() : Observable<boolean>{
    this.authenticateUser = undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }
}
