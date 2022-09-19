import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { UserComponent } from './user.component';
import { CarroComponent } from './carro.component';
import { AddUserComponent } from './adduser.component';
import { AddCarroComponent } from './addcarro.component';
import { MFEContext } from './library/mfecontext';
import { AppRoutingModule } from './app.routing.module';
import { HomeViewComponent } from './views/home/home.component';
import { CarroViewComponent } from './views/carro/carro.component';

@NgModule({
  imports: [AppRoutingModule, BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    HomeViewComponent,
    CarroViewComponent,
    HelloComponent,
    UserComponent,
    CarroComponent,
    AddUserComponent,
    AddCarroComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    const mfeContext = new MFEContext({
      namespace: 'APP_Cambio',
    });
    mfeContext.start();
  }
}
