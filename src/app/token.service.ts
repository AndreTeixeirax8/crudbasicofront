import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  isLogged(): boolean {
    if(this.getToken()){
      return true
    }
    return false
  }
  

  setToken(token:string):void{
    localStorage.setItem('token',token)
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserName(): string | null {
    if (!this.isLogged()) {
      return null;
    }
  
    const token = this.getToken();
    const payload = token ? token.split('.')[1] : undefined;
  
    if (payload) {
      const values = atob(payload);
      const valuesJson = JSON.parse(values);
      const userName = valuesJson.userName;
      return userName;
    } else {
      return null;
    }
  }

  logOut():void{
    localStorage.clear()
  }

}
