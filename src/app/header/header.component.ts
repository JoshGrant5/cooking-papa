import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed= true;

  // featureSelected is bound to onNavigate in app.component.html => determines whether to show recipes or shopping list
  @Output() featureSelected = new EventEmitter<string>();

  // bound to click event of navbar in header.html
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
