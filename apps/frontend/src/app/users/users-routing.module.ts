import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {
    path: 'users-list',
    component: UsersListComponent,
  },
 
  { path: 'users-list', redirectTo: 'users-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'users-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
