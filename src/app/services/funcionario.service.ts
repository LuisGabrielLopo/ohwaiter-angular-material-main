import { Funcionario } from './../models/funcionario';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  //json-server //url = 'http://localhost:3000/funcionarios';
  url = 'http://localhost:8080/funcionario';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http
      .get<Funcionario[]>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  getFuncionarioPorNome(nome: string): Observable<Funcionario[]> {
    return this.http
      .get<Funcionario[]>(this.url + '/' + nome)
      .pipe(retry(2), catchError(this.handleError));
  }

  salvarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    funcionario.ativo = Boolean(JSON.parse(funcionario.ativo));
    return this.http
      .post<Funcionario>(
        this.url,
        JSON.stringify(funcionario),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  excluirFuncionario(funcionario: Funcionario) {
    return this.http
      .delete<Funcionario>(this.url + '/' + funcionario.id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  editarFuncionario(funcionario: Funcionario) {
    return this.http
      .put<Funcionario>(this.url, JSON.stringify(funcionario), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =
        `Código de erro: ${error.status}, ` + ` menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
