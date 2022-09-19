import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeViewComponent } from './views/home/home.component';
import { CarroViewComponent } from './views/carro/carro.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      { path: 'carro', component: CarroViewComponent },
      { path: 'home', component: HomeViewComponent },
      { path: '**', redirectTo: 'home' },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
