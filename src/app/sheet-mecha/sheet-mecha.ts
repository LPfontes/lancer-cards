import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperComponent, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';


@Component({
  selector: 'sheet-mecha-component',
  imports: [CommonModule, ImageCropperComponent],
  standalone: true,
  templateUrl: './sheet-mecha.html',
  styleUrl: './sheet-mecha.css',
})
export class SheetMecha  {
  
  dataImg: any = ''; // Sua variável existente para a imagem final
  imageChangedEvent: any = ''; // Evento do input file
  currentImageEvent: any = ''; // Armazena o evento da imagem confirmada para reedição
  croppedImage: any = ''; // Imagem temporária sendo cortada
  showCropper = false;
  scale = 1;
  transform: ImageTransform = {};
  traits: any[] = [{}];
  weapons: any[] = [{}];
  systems: any[] = [{}];
  
  // Substitui o onFileSelected antigo
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.scale = 1; // Reseta o zoom ao carregar nova imagem
    this.transform = { scale: 1 };
    this.showCropper = true;
  }

  // Chamado a cada ajuste no cropper
  imageCropped(event: ImageCroppedEvent) {
    // Usa objectUrl para melhor performance ou base64 se preferir
    this.croppedImage = event.objectUrl || event.base64;
  }

  // Confirma o corte e atualiza a imagem principal
  confirmCrop() {
    this.dataImg = this.croppedImage;
    this.currentImageEvent = this.imageChangedEvent; // Salva o evento atual como confirmado
    this.showCropper = false;
  }

  // Cancela a operação
  cancelCrop() {
    this.imageChangedEvent = this.currentImageEvent; // Restaura o evento anterior se cancelar um novo upload
    this.showCropper = false;
  }

  editImage() {
    this.imageChangedEvent = this.currentImageEvent; // Garante que editamos a imagem atual
    this.showCropper = true;
  }

  zoom(value: string) {
    this.scale = parseFloat(value);
    this.transform = { ...this.transform, scale: this.scale };
  }

  onFileClick(event: any) {
    event.target.value = ''; // Permite selecionar o mesmo arquivo novamente
  }

  addTrait() {
    this.traits.push({});
  }

  removeTrait(index: number) {
    this.traits.splice(index, 1);
  }

  addWeapon() {
    this.weapons.push({});
  }

  removeWeapon(index: number) {
    this.weapons.splice(index, 1);
  }

  addSystem() {
    this.systems.push({});
  }

  removeSystem(index: number) {
    this.systems.splice(index, 1);
  }
  
}
