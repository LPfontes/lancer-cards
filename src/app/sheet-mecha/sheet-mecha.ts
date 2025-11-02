import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'sheet-mecha-component',
  imports: [CommonModule,NgOptimizedImage],
  standalone: true,
  templateUrl: './sheet-mecha.html',
  styleUrl: './sheet-mecha.css',
})
export class SheetMecha {
  
  dataImg: string | ArrayBuffer | null = null;
  mechaImg = "default.png"
  
  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files[0]) {
      const file = element.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.dataImg = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
}
