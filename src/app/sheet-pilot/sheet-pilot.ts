import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperComponent, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';

@Component({
 selector: 'sheet-pilot-component',
 imports: [CommonModule, ImageCropperComponent],
 standalone: true,
 templateUrl: './sheet-pilot.html',
 styleUrl: './sheet-pilot.css',
})
export class SheetPilot {
 
 dataImg: any = '';
 imageChangedEvent: any = '';
 currentImageEvent: any = '';
 croppedImage: any = '';
 showCropper = false;
 scale = 1;
 transform: ImageTransform = {};
 
 // Listas dinâmicas para o piloto
 triggers: any[] = [{}];
 talents: any[] = [{}];
 gear: any[] = [{}];
 licenses: any[] = [{}];
 fileChangeEvent(event: any): void {
   this.imageChangedEvent = event;
   this.scale = 1;
   this.transform = { scale: 1 };
   this.showCropper = true;
 }

 imageCropped(event: ImageCroppedEvent) {
   this.croppedImage = event.objectUrl || event.base64;
 }

 confirmCrop() {
   this.dataImg = this.croppedImage;
   this.currentImageEvent = this.imageChangedEvent;
   this.showCropper = false;
 }

 cancelCrop() {
   this.imageChangedEvent = this.currentImageEvent;
   this.showCropper = false;
 }

 editImage() {
   this.imageChangedEvent = this.currentImageEvent;
   this.showCropper = true;
 }

 zoom(value: string) {
   this.scale = parseFloat(value);
   this.transform = { ...this.transform, scale: this.scale };
 }

 onFileClick(event: any) {
   event.target.value = '';
 }

 // Funções para Gatilhos
 addTrigger() {
   this.triggers.push({});
 }

 removeTrigger(index: number) {
   this.triggers.splice(index, 1);
 }

 // Funções para Talentos
 addTalent() {
   this.talents.push({});
 }

 removeTalent(index: number) {
   this.talents.splice(index, 1);
 }

 // Funções para Equipamentos
 addGear() {
   this.gear.push({});
 }

 removeGear(index: number) {
   this.gear.splice(index, 1);
 }
  addLicense() {
    this.licenses.push({});
  }

  removeLicense(index: number) {
    this.licenses.splice(index, 1);
  } 
}
