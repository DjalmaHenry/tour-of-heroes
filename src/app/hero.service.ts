import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL para web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // Pega todos os heróis.
  getHeroes(): Observable<Hero[]> { //retorna um array observable de heroi
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  // Retorna o herói pelo id especificado. Será erro 404 se o id não for encontrado.
  getHero(id: number): Observable<Hero> { //retorna um observable de heroi
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // Atualiza os dados de um herói no servidor e retorna um observable do herói.
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // Adiciona um novo herói ao servidor e retorna um observable do novo herói.
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  //Exclui um herói do servidor.
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  //Busca por um herói pelo nome.
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // Se não for o termo de pesquisa, retorna uma matriz de herói vazia.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  // Adiciona um registro de mensagem no console.
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  // Lidar com a operação Http que falhou. Retorna uma mensagem de erro como um Observable.
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // Para enviar o erro para a infraestrutura de registro remoto
      console.error(error); // em vez disso, entre no console

      // Para melhor trabalho de transformação de erro para consumo do usuário
      this.log(`${operation} failed: ${error.message}`);

      // Deixe o aplicativo continuar em execução, retornando um resultado vazio.
      return of(result as T);
    };
  }
}
