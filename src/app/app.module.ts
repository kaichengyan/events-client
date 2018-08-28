import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MarkdownModule, MarkedOptions } from "ngx-markdown";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { NgHttpLoaderModule } from "ng-http-loader";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { OAuthModule } from 'angular-oauth2-oidc';
import { NgxCaptchaModule } from 'ngx-captcha';

import { AppComponent } from "./app.component";
import { WorkshopsComponent } from "./workshops/workshops.component";
import { WorkshopDetailComponent } from "./workshop-detail/workshop-detail.component";
import { AppRoutingModule } from ".//app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MessagesComponent } from "./messages/messages.component";
import { RegistrationFormComponent } from './registration-form/registration-form.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkshopsComponent,
    WorkshopDetailComponent,
    MessagesComponent,
    RegistrationFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    NgHttpLoaderModule,
    OAuthModule,
    NgxCaptchaModule.forRoot({
      reCaptcha2SiteKey: '6LfYkWwUAAAAAPQNRg4OiaHB6AXUELxXKAlHrwn_',
    }),
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
  bootstrap: [AppComponent],
})
export class AppModule {}
