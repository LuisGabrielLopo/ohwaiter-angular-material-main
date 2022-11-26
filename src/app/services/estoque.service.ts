import { Observable, retry, catchError, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estoque } from '../models/estoque';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  url = `http://localhost:8080/estoque`;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getEstoque(): Observable<Estoque[]> {
    return this.http
      .get<Estoque[]>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  salvarEstoque(estoque: Estoque): Observable<Estoque> {
    return this.http
      .post<Estoque>(this.url, JSON.stringify(estoque), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  excluirEstoque(estoque: Estoque) {
    return this.http
      .delete(this.url + `/` + estoque.id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  editarEstoque(estoque: Estoque) {
    return this.http
      .put<Estoque>(this.url, JSON.stringify(estoque), this.httpOptions)
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
