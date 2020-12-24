import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Test Recipe', 'A test recipe', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.simplyrecipes.com%2Frecipes%2Feggs_benedict%2F&psig=AOvVaw2DqwK0Dn9sopqyon9h1TrS&ust=1608931762587000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOiOzoPI5-0CFQAAAAAdAAAAABAD'),
    new Recipe('Test Recipe', 'A test recipe', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.simplyrecipes.com%2Frecipes%2Feggs_benedict%2F&psig=AOvVaw2DqwK0Dn9sopqyon9h1TrS&ust=1608931762587000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOiOzoPI5-0CFQAAAAAdAAAAABAD')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
