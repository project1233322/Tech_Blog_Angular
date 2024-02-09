import { Injectable } from '@angular/core';

const TOKEN = "c_token";
const USER = "c_user";


@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }

  public saveUser(user: any){
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  public saveToken(token:string){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }
  
  static getToken(): string|null{
    return localStorage.getItem(TOKEN);
  }
  
  static isUserLoggedIn(){
    if(this.getToken()==null){
      return false;
    }
    return true;
  }

  static getUser(): any {
    const userString = localStorage.getItem(USER);
  
    if (userString !== null) {
      return JSON.parse(userString);
    }
  
    // Handle the case where the user data is not found in localStorage
    // You can return a default value, throw an error, or handle it as needed.
    return null;
  }
  // static getUser(): any{
  //   return JSON.parse(localStorage.getItem(USER));
  // }
  static getUserId():string{
    const user = this.getUser();
    if(user == null ) { return '';}
    return user.userId;
  }

  static hasToken():boolean{
    if(this.getToken()===null)
      return false;
    return true;
  }

  static logout(){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
