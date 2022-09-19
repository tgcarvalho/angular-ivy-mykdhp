import { Component, Input, OnInit } from '@angular/core';
import { Context } from './library';

export const carrosResponse = [
  {
    name: 'Onix',
    marca: 'Chevrolet',
  },
  {
    name: 'Gol',
    marca: 'Volkswagen',
  },
  {
    name: 'Golf',
    marca: 'Volkswagen',
  },
  {
    name: 'Ka',
    marca: 'Ford',
  },
  {
    name: 'Civic',
    marca: 'Honda',
  },
];

@Component({
  selector: 'carro',
  template: `<div>
    <h1>Hello {{name}}!</h1> 
    <ul *ngIf="carros.length">
      <li *ngFor="let carro of carros;">
        {{carro.name}} - {{carro.marca}}
      </li>
    </ul>
  </div>`,
  styles: [`h1 { font-family: Lato; } div { margin: 1rem 0}`],
})
export class CarroComponent implements OnInit {
  @Input() name: string;
  context = new Context({
    domain: 'APP_Cambio',
    host: 'automoveis',
    state: 'carros',
  });
  carros: Array<{ name: string; marca: string }> = [];

  constructor() {}

  ngOnInit(): void {
    //this.context.set(carrosResponse);
    this.context.get().subscribe((carros) => {
      this.carros = carros;
    });
  }
}
