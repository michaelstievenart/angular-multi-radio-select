import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MultiRadioSelectModule } from './multi-radio-select/multi-radio-select.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MultiRadioSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
