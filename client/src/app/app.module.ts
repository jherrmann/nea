import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

import { FormsModule } from '@angular/forms';

import { HotkeyModule } from 'angular2-hotkeys';

import { AppComponent } from './app.component';
import { AnnotatorComponent } from './annotator-editor/annotator-editor.component';
import { AnnotationListComponent } from './annotation-list/annotation-list.component';
import { EntitytypeListComponent } from './entitytype-list/entitytype-list.component';
import { ClassListComponent } from './class-list/class-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AnnotatorComponent,
    AnnotationListComponent,
    EntitytypeListComponent,
    ClassListComponent
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
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    MatChipsModule,
    HotkeyModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
