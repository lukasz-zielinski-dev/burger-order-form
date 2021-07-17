import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { BurgerFormComponent } from './components/burger-form/burger-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomSelectControlComponent } from './components/custom-select-control/custom-select-control.component';

@NgModule({
  declarations: [
    AppComponent,
    BurgerFormComponent,
    CustomSelectControlComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
