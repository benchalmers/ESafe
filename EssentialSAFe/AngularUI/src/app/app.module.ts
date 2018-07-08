import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FeatureComponent } from './feature/feature.component';
import { FeatureCardComponent } from './feature-card/feature-card.component';
import { StoryComponent } from './story/story.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeatureComponent,
    FeatureCardComponent,
    StoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 
