import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WorkshopDetailComponent } from "./workshop-detail/workshop-detail.component";
import { WorkshopsComponent } from "./workshops/workshops.component";

const routes: Routes = [
  { path: "", redirectTo: "workshops", pathMatch: "full" },
  { path: "workshop/:id", component: WorkshopDetailComponent },
  { path: "workshops", component: WorkshopsComponent },
  { path: "admin", loadChildren: "./admin/admin.module#AdminModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
