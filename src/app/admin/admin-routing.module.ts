import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoggedInGuard } from "../logged-in.guard";
import { AuthGuard } from "../auth.guard";
import { AdminIndexComponent } from "./admin-index/admin-index.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { NewWorkshopComponent } from "./new-workshop/new-workshop.component";
import { EditWorkshopComponent } from "./edit-workshop/edit-workshop.component";
import { AdminDetailComponent } from "./admin-detail/admin-detail.component";

const routes: Routes = [
  { path: "", redirectTo: "workshops", pathMatch: "full" },
  {
    path: "login",
    component: AdminLoginComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: "workshops",
    component: AdminIndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "workshop/new",
    component: NewWorkshopComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "workshop/:id",
    component: AdminDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "workshop/:id/edit",
    component: EditWorkshopComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
