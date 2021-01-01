import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
  // ViewContainerRef gives access to reference to a pointer at the place where this directive is used
  constructor(public viewContainerRef: ViewContainerRef) {}
}
