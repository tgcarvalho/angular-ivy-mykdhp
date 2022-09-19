import { Component, Input, OnInit } from '@angular/core';
import { Context } from './library';

@Component({
  selector: 'user',
  template: `<div>
    <h1>Hello {{name}}!</h1> 
    <span *ngIf="user">
      <strong>User: </strong>{{user.name}}, idade: {{user.age}}
    </span>
  </div>`,
  styles: [`h1 { font-family: Lato; } div { margin: 1rem 0}`],
})
export class UserComponent implements OnInit {
  @Input() name: string;
  context = new Context({
    domain: 'APP_Cambio',
    host: 'extrato',
    state: 'user',
  });
  user: { name: string; age: number };

  constructor() {}

  ngOnInit(): void {
    this.context.set({
      name: 'Lara Ismael',
      age: 34,
    });
    this.context.get().subscribe((data) => (this.user = data));
  }
}
