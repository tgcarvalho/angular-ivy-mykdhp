import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Context } from './library';

@Component({
  selector: 'addcarro',
  template: `<form [formGroup]="autoForm" (ngSubmit)="update()">
  <h1>{{name}}</h1>
  <label for="name">Nome: </label>
  <input id="name" type="text" formControlName="name">
  &nbsp;&nbsp;&nbsp;
  <label for="marca">Marca: </label>
  <input id="marca" type="text" formControlName="marca">
  <button type="submit" [disabled]="!autoForm.valid">Adicionar carro</button>
</form>
  `,
  styles: [`h1 { font-family: Lato; } form { margin: 1rem 0}`],
})
export class AddCarroComponent {
  @Input() name: string;
  context = new Context({
    domain: 'APP_Cambio',
    host: 'automoveis',
    state: 'carros',
  });

  autoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
  });

  constructor() {}

  update(): void {
    const isEmpty = Object.keys(this.context.value).length === 0;
    const update = isEmpty
      ? [this.autoForm.value]
      : [...this.context.value, this.autoForm.value];
    this.context.set(update);
    this.autoForm.reset();
  }
}
