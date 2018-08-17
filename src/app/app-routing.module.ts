import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { WorkshopDetailComponent } from './workshop-detail/workshop-detail.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';
import { NewWorkshopComponent } from './new-workshop/new-workshop.component';
import { EditWorkshopComponent } from './edit-workshop/edit-workshop.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './auth.guard';
import { LoggedInGuard } from './logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: '/workshops', pathMatch: 'full' },
  { path: 'workshop/:id', component: WorkshopDetailComponent },
  { path: 'workshops', component: WorkshopsComponent },
  { path: 'admin', redirectTo: '/admin/workshops', pathMatch: 'full' },
  { path: 'admin/login', component: AdminLoginComponent, canActivate: [LoggedInGuard] },
  { path: 'admin/workshops', component: AdminIndexComponent, canActivate: [AuthGuard] },
  { path: 'admin/workshop/new', component: NewWorkshopComponent, canActivate: [AuthGuard] },
  { path: 'admin/workshop/:id', component: AdminDetailComponent, canActivate: [AuthGuard] },
  { path: 'admin/workshop/:id/edit', component: EditWorkshopComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
