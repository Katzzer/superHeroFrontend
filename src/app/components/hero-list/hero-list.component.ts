import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from 'src/app/common/hero';
import {ActivatedRoute} from '@angular/router';
import {HeroPersonalData} from '../../common/hero-personal-data';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  heroes: Hero[];
  heroPersonalData: HeroPersonalData[];
  currentCategoryId: number;
  currentHeroName: string;
  isHero: boolean;

  constructor(private heroService: HeroService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listHeroes();
    });
  }

  listHeroes(): void {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      this.currentHeroName = this.route.snapshot.paramMap.get('name');
    } else {
      this.currentCategoryId = 1;
      this.currentHeroName = 'Batman';
    }

    this.heroService.getHeroList(this.currentCategoryId).subscribe(
      data => {
        this.heroes = data;
      }
    );
    this.heroService.getHeroPersonalDataFromPublicAPI(this.currentHeroName).subscribe(
      data => {
        this.heroPersonalData = data;
        this.isHeroTest();
      }
    );
  }

  isHeroTest(): void {
    this.isHero = typeof this.heroPersonalData !== 'undefined' && this.heroPersonalData[0].biography.alignment === 'good';
  }
}
