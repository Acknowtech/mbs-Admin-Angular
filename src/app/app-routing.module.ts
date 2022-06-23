import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path : '',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path : 'admin',
    loadChildren: './admin/admin.module#AdminModule', canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
