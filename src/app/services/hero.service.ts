import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from '../hero';
import { MessageService } from './message.service';
import { Injectable } from '@angular/core';

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
    private messageService: MessageService,
    private db: AngularFirestore
  ) {}


  // Pega todos os heróis.
  getHeroes(): Observable<Hero[] | void> { //retorna um array observable de heroi
    return this.db.collection<Hero>('heroes').valueChanges();
  };

  // Retorna o herói pelo id especificado. Será erro 404 se o id não for encontrado.
  getHero(id: number): Observable<Hero | void> { //retorna um observable de heroi
    return this.db.collection('heroes').doc<Hero>(`${id}`).valueChanges();
  }

  // Atualiza os dados de um herói no servidor e retorna um observable do herói.
  updateHero(hero: Hero): Observable<any> {
    this.db.collection('heroes').doc<Hero>(`${hero.id}`).update(hero);
    return this.db.collection('heroes').doc<Hero>(`${hero.id}`).valueChanges();
  }

  // Adiciona um novo herói ao firestore.
  addHero(hero: Hero) {
    hero.id = 5;
    return this.db.collection('heroes').doc(`${hero.id}`).set(hero);
  }

  //Exclui um herói do servidor.
  deleteHero(id: number) {
    return this.db.collection('heroes').doc<Hero>(`${id}`).delete();
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
