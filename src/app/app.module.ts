import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MzButtonModule, MzInputModule } from 'ng2-materialize';
import { MzRadioButtonModule } from 'ng2-materialize'
import { MzSelectModule } from 'ng2-materialize'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MzDatepickerModule } from 'ng2-materialize'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MzButtonModule,
    MzInputModule,
    MzRadioButtonModule,
    FormsModule,
    MzSelectModule,
    MzDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
