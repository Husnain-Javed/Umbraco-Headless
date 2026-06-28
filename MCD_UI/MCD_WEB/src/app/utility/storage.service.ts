
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LanguageService } from "./language.service";

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  loggedUser: any;

  constructor(private router : Router, private languageService : LanguageService){}
  SaveLoggedInUser(user: any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  GetLoggedInUser(){
   var jsonuser = localStorage.getItem('user');
   if(jsonuser){
    return JSON.parse(jsonuser);
   }
   return null;
  }

  GetUserToken(){

    let Userinfo = null;
    Userinfo = this.GetLoggedInUser();
   if(Userinfo != null){
   return Userinfo.Token;
   }
   return null;
   }

   GetUserRefreshToken(){
    let Userinfo = null;
    Userinfo = this.GetLoggedInUser();
   if(Userinfo != null){
   return Userinfo.RefreshToken;
   }
   return null;
   }

  SignOutLoggedInUser(){
    localStorage.removeItem('user');
        this.languageService.navigateTo('/login');

  }

  Unauthorized(){
    localStorage.removeItem('user');
       this.languageService.navigateTo('/unauthorized');


  }


GetUserRoles(){
  let user = this.GetLoggedInUser();
  if(user){
    return user.UserRoles;
  }
  return null;
}


  getCurrentLang(): string {
    return localStorage.getItem('lang') || 'en-US';
  }


}
