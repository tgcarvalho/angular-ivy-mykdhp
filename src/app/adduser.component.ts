import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Context } from './library';

@Component({
  selector: 'adduser',
  template: `<form [formGroup]="profileForm" (ngSubmit)="updateUser()">
  <h1>{{name}}</h1>
  <label for="name">Name: </label>
  <input id="name" type="text" formControlName="name">
  &nbsp;&nbsp;&nbsp;
  <label for="age">Age: </label>
  <input id="age" type="number" formControlName="age">
  <button type="submit" [disabled]="!profileForm.valid">Adicionar usuario</button>
</form>
  `,
  styles: [`h1 { font-family: Lato; } form { margin: 1rem 0}`],
})
export class AddUserComponent {
  @Input() name: string;
  context = new Context({
    domain: 'APP_Cambio',
    host: 'extrato',
    state: 'user',
  });

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl(null, Validators.required),
  });

  constructor() {}

  updateUser(): void {
    this.context.set(this.profileForm.value);
    this.profileForm.reset();
  }
}
