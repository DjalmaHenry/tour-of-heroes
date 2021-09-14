import { Injectable } from '@nestjs/common';
import { Hero } from './hero';

@Injectable()
export class AppService {
  heroes: Hero[] = [];

  // pega todas as mensagens
  getAll() {
    return this.heroes;
  }

  // pega uma mensagem pelo id
  getById(id: number) {
    return this.heroes.find((value) => value.id == id);
  }

  // adiciona uma nova mensagem
  create(hero: Hero) {
    let lastId = 0;
    if (this.heroes.length > 0) {
      lastId = this.heroes[this.heroes.length - 1].id;
    }

    hero.id = lastId + 1;
    this.heroes.push(hero);

    return hero;
  }

  // atualiza um heroi
  update(hero: Hero) {
    const heroUP = this.getById(hero.id);
    if (heroUP) {
      heroUP.name = hero.name;
    }

    return heroUP;
  }

  delete(id: number) {
    const index = this.heroes.findIndex((value) => value.id == id);
    this.heroes.splice(index, 1);
  }

  deleteAll() {
    this.heroes = [];
  }
}
