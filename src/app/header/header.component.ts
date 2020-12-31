import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed = true;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
  }

  onSaveData() {
    this.databaseService.storeRecipes();
  }

}
