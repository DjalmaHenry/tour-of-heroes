import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.scss' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Coloque um termo de pesquisa no fluxo observable.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // Espere 300ms após cada pressionamento de tecla antes de considerar o termo.
      debounceTime(300),

      // Ignorar o novo termo se for igual ao anterior
      distinctUntilChanged(),

      // Mudar para uma nova pesquisa observable cada vez que o termo mudar.
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
