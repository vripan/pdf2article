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

  public ngOnInit(): void {
    this.toastr.overlayContainer = this.toastContainer;
  }

  public showSuccess(): void {
    this.toastr.success('File uploaded successfully!', 'Success!');
  }
  public showError(): void {
    this.toastr.error('There\'s been a problem uploading your file', 'Error!');
  }
  public showWarning(): void {
    this.toastr.warning('Warning regarding your file!', 'Warning!');
  }
  public showInfo(): void {
    this.toastr.info('Here is some information for you.', 'Information');
  }
}
