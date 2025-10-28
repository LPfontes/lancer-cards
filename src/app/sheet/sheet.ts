import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
export interface SheetItem {
  name: string;
  turn: number;
  actions: string[];
  notes?: string;

}
@Component({
  selector: 'sheet-component',
  imports: [NgOptimizedImage],
  templateUrl: './sheet.html',
  styleUrl: './sheet.css',
})
export class SheetComponent {

}
