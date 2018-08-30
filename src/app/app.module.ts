import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MultiRadioSelectModule } from './multi-radio-select/multi-radio-select.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MultiRadioSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
