import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';

// resolvers added to certain routes => will run resolver code before the route is loaded
const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'authentication', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
