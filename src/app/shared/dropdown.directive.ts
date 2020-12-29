import { Directive, HostListener, HostBinding } from '@angular/core';

// Name of the directive is appDropdown, which is what we will add to elements as an attribute
@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {

  // Whatever element this directive is bound to, this directive will toggle its "open" attribute
  @HostBinding('class.open') isOpen = false;

  @HostListener('click')  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
