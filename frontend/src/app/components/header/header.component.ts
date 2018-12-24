import { Component, Input } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() public readonly appTitle: string;

  constructor(
    private router: Router,
    private modalService: NgxSmartModalService
  ) { }

  public navigateTo(address: string): void {
    this.router.navigateByUrl(address);
  }

  public triggerModal(route: string): void {
    this.modalService.getModal(route).open();
  }
}
