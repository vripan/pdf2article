import { Component, OnInit, ViewChild } from '@angular/core';

import { UploadEvent, UploadFile, FileSystemFileEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';

import { UploadMainService } from './services/upload-main.service';

@Component({
  selector: 'app-upload-main',
  templateUrl: './upload-main.component.html',
  styleUrls: ['./upload-main.component.scss']
})
export class UploadMainComponent implements OnInit {

  @ViewChild('devToggle') public devToggle;
  public devMode: boolean;

  public fileToUpload: File = null;
  public fileName: String = '';
  public files: UploadFile[] = [];
  public fileHash: string;

  constructor(
    private toastr: ToastrService,
    private uploadService: UploadMainService
  ) { }

  public ngOnInit(): void {
    this.changeMode();
  }

  public async handleFileInput(file: File) {
    if (file && file.type === 'application/pdf') {
      this.fileName = file.name;
      await this.uploadService.postPDF(file)
        .then(response => {
          this.fileHash = response.hash;
          this.toastr.info(response.message);
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

  private changeMode() {
    this.devToggle.nativeElement.addEventListener('click', () => {
      this.devMode = this.devToggle.nativeElement.checked;
    });
  }
}
