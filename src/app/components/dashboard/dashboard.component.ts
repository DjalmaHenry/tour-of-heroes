import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  // Pega os heróis da posição 1 até 5.
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {if(heroes){this.heroes = heroes.slice(1, 5)}});
  }
}
