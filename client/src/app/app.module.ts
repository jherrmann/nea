import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

import { HotkeyModule } from 'angular2-hotkeys';

import { AppComponent } from './app.component';
import { AnnotatorComponent } from './annotator/annotator.component';
import { AnnotationListComponent } from './annotation-list/annotation-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AnnotatorComponent,
    AnnotationListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatRadioModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    FormsModule,
    HotkeyModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
