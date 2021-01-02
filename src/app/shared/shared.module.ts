import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { SpinnerComponent } from "./spinner/spinner.component";

@NgModule({
  declarations: [
    AlertComponent,
    SpinnerComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    SpinnerComponent,
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule {

}
