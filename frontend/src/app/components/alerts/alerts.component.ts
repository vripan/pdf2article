import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

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
  ngOnInit() {
    this.toastr.overlayContainer = this.toastContainer;
  }
}
