import { Component } from '@angular/core';

import { UploadEvent, UploadFile, FileSystemFileEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';

import { UploadMainService } from './upload-main.service';
import { resolve } from 'url';

@Component({
  selector: 'app-upload-main',
  templateUrl: './upload-main.component.html',
  styleUrls: ['./upload-main.component.scss']
})
export class UploadMainComponent {

  fileToUpload: File = null;
  fileName: String = '';
  public files: UploadFile[] = [];
  fileHash: string;

  constructor(
    private toastr: ToastrService,
    private uploadService: UploadMainService
  ) { }

  async handleFileInput(file: File) {
    if (file && file.type === 'application/pdf') {
      this.fileName = file.name;
      await this.uploadService.postPDF(file)
      .then(result => {
        this.fileHash = result.hash;
        this.toastr.info(result.message);
      });
        
    } else {
      this.toastr.error('Invalid file');
    }
  }

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.handleFileInput(file);
        });
      }
    }
  }
}

