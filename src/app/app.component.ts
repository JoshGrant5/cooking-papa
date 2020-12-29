import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipe-app';

  loadedFeature = 'recipe';

  // The value passed to onNavigate in will determine whether we render the recipes or shopping list
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
