import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MarkdownModule, MarkedOptions } from "ngx-markdown";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { NgHttpLoaderModule } from "ng-http-loader";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { ModalModule } from "ngx-bootstrap/modal";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppComponent } from "./app.component";
import { WorkshopsComponent } from "./workshops/workshops.component";
import { WorkshopDetailComponent } from "./workshop-detail/workshop-detail.component";
import { AppRoutingModule } from ".//app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AdminIndexComponent } from "./admin-index/admin-index.component";
import { AdminDetailComponent } from "./admin-detail/admin-detail.component";
import { NewWorkshopComponent } from "./new-workshop/new-workshop.component";
import { MessagesComponent } from "./messages/messages.component";
import { EditWorkshopComponent } from "./edit-workshop/edit-workshop.component";
import { ModalMessageComponent } from "./modal-message/modal-message.component";
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkshopsComponent,
    WorkshopDetailComponent,
    AdminIndexComponent,
    AdminDetailComponent,
    NewWorkshopComponent,
    MessagesComponent,
    EditWorkshopComponent,
    ModalMessageComponent,
    AdminLoginComponent
  ],
  entryComponents: [ModalMessageComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFontAwesomeModule,
    NgHttpLoaderModule,
    OAuthModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: false,
          tables: true,
          breaks: true,
          pedantic: true,
          sanitize: false,
          smartLists: true,
          smartypants: false
        }
      }
    }),
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}