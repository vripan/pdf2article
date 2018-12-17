import { Component } from '@angular/core';

import { UploadEvent, UploadFile, FileSystemFileEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';

import { UploadMainService } from './upload-main.service';

@Component({
  selector: 'app-upload-main',
  templateUrl: './upload-main.component.html',
  styleUrls: ['./upload-main.component.scss']
})
export class UploadMainComponent {

  fileToUpload: File = null;
  fileName: String = '';
  public files: UploadFile[] = [];

  constructor(
    private toastr: ToastrService,
    private uploadService: UploadMainService
  ) { }

  async handleFileInput(file: File) {
    if (file && file.type === 'application/pdf') {
      this.fileToUpload = file;
      this.fileName = this.fileToUpload.name;

      // TODO
      this.toastr.info(this.uploadService.postPDF(file));
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

