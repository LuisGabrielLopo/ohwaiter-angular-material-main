import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient) {

   }
   login(login:string, senha:string): Observable<any>{
    return this.httpClient.post(`${environment.apiUrl}/login`, {'login':login, 'senha':senha});
   }
   criar(login: string, senha:string, cpf:string, nome:string): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/login/criar`, {"login":login, "pass": senha, "nome": nome, "cpf":cpf})
   }
}
