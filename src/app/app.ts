import { Component, signal } from '@angular/core';
import { CardComponent } from './card/card.js';
import { SheetComponent } from './sheet/sheet.js';

@Component({
  selector: 'app-root',
  // Adicione o SheetComponent aos imports quando ele for criado
  imports: [CardComponent, SheetComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Signal para controlar a view ativa. Inicia com 'card'.
  activeView = signal<'card' | 'sheet'>('card');

  setView(view: 'card' | 'sheet'): void {
    this.activeView.set(view);
  }
}
