import 'zone.js';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
    <input #file type="file" accept=".jpeg,.jpg,.png" multiple (change)="chooseFile($event.target)"/>
    <div style="overflow:auto;">
      <div style="width:150px" *ngFor="let item of choosePhotoList">
        <img [src]="item" width="100%" height="100%" style="object-fit: contain;"/>
      </div>
    </div>
  `,
})
export class App {
  name = 'Angular';
  @ViewChild('file') uploadFile!: ElementRef<HTMLInputElement>;
  choosePhotoList: string[] = [];

  chooseFile(data: any) {
    console.log(data.files);
    const reader = new FileReader();
    let currentIndex = 0;
    const readNextFile = () => {
      console.log('讀取');
      if (currentIndex < data.files.length) {
        const choosePhotoList = this.choosePhotoList;
        const uploadFile = this.uploadFile;
        reader.onload = function (e: any) {
          choosePhotoList.push(e.target.result);
          // index加1 準備處理下一個照片
          currentIndex++;
          // 開始處理
          readNextFile();
          if (currentIndex === data.files.length) {
            console.log('照片讀取完畢');
            uploadFile.nativeElement.value = '';
            uploadFile.nativeElement.files = null;
          }
        };
        reader.readAsDataURL(data.files.item(currentIndex));
      }
    };
    readNextFile();
  }
}

bootstrapApplication(App);
