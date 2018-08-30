import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { MarkdownModule } from "ngx-markdown";
import { AngularFontAwesomeModule } from "angular-font-awesome";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminDetailComponent } from "./admin-detail/admin-detail.component";
import { AdminIndexComponent } from "./admin-index/admin-index.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { EditWorkshopComponent } from "./edit-workshop/edit-workshop.component";
import { NewWorkshopComponent } from "./new-workshop/new-workshop.component";


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    ButtonsModule.forRoot(),
    MarkdownModule.forRoot({
      // markedOptions: {
      //   provide: MarkedOptions,
      //   useValue: {
      //     gfm: false,
      //     tables: true,
      //     breaks: true,
      //     pedantic: true,
      //     sanitize: false,
      //     smartLists: true,
      //     smartypants: false
      //   }
      // }
    })
  ],
  declarations: [
    AdminDetailComponent,
    AdminIndexComponent,
    AdminLoginComponent,
    EditWorkshopComponent,
    NewWorkshopComponent
  ]
})
export class AdminModule {}
