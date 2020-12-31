import { Component } from '@angular/core';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  collapsed = true;

  constructor(private databaseService: DatabaseService) { }

  onSaveData() {
    this.databaseService.storeRecipes();
  }

  onFetchData() {
    this.databaseService.fetchRecipes().subscribe();
  }

}
