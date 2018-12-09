import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private toastr: ToastrService) {}
  showSuccess() {
    this.toastr.success('File uploaded successfully!', 'Success!');
  }
  showError() {
    this.toastr.error("There's been a problem uploading your file", 'Error!');
  }
  showWarning() {
    this.toastr.warning('Warning regarding your file!', 'Warning!');
  }
  showInfo() {
    this.toastr.info('Here is some information for you.', 'Information');
  }
}
