import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalcComponent } from './components/calc/calc.component';
import { HeaderComponent } from './components/calc/header/header.component';
import { BodyComponent } from './components/calc/body/body.component';
import { FooterComponent } from './components/calc/footer/footer.component';
import { SelectComponent } from './components/calc/body/select/select.component';
import { OptionComponent } from './components/calc/body/option/option.component';
import { BoostButtonComponent } from './components/boost-button/boost-button.component';

@NgModule({
  declarations: [
    AppComponent,
    CalcComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    SelectComponent,
    OptionComponent,
    BoostButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
