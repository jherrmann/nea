import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

import { HotkeyModule } from 'angular2-hotkeys';

import { AppComponent } from './app.component';
import { AnnotatorComponent } from './annotator/annotator.component';


@NgModule({
  declarations: [
    AppComponent,
    AnnotatorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
    HotkeyModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
