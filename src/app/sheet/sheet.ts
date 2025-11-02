import { Component , signal} from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import {SheetMecha} from '../sheet-mecha/sheet-mecha';
import { SheetPilot } from '../sheet-pilot/sheet-pilot';

export interface SheetItem {
  name: string;
  turn: number;
  actions: string[];
  notes?: string;

}

@Component({
  selector: 'sheet-component',
  imports: [NgOptimizedImage, SheetMecha, SheetPilot],
  templateUrl: './sheet.html',
  styleUrl: './sheet.css',
})
export class SheetComponent {

  activeView = signal<'mecha' | 'pilot'>('mecha');
  
    setView(view: 'mecha' | 'pilot'): void {
      this.activeView.set(view);
    }


}
