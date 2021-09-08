import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../hero';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Spider-Man' },
      { id: 2, name: 'Iron-Man' },
      { id: 3, name: 'Thor' },
      { id: 4, name: 'Captain America' },
      { id: 5, name: 'Loki' },
      { id: 6, name: 'Vision' },
      { id: 7, name: 'Wanda' },
      { id: 8, name: 'Black Widow' },
      { id: 9, name: 'Captain Marvel' },
      { id: 10, name: 'Wonder Woman' }
    ];
    return {heroes};
  }

  // Substitui o método genId para garantir que um herói sempre tenha um id.
  // Se a matriz de heróis estiver vazia,
  // o método abaixo retorna o número inicial (1).
  // Se o array heroes não estiver vazio, o método abaixo retorna o mais alto
  // id de herói + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
