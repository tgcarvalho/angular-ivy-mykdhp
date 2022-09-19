import { Component, OnInit } from '@angular/core';
import { Context } from '../../library';

@Component({
  selector: 'carroview',
  templateUrl: './carro.component.html',
})
export class CarroViewComponent implements OnInit {
  context = new Context({
    domain: 'APP_Cambio',
    host: 'automoveis',
    state: 'carros',
  });
  carros: Array<{ name: string; marca: string }> = [];

  constructor() {}

  ngOnInit(): void {
    this.context.get().subscribe((carros) => {
      this.carros = carros;
    });
  }
}
