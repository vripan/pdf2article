import { Component, OnInit, Input } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() public appTitle: string;

  constructor(
    private modalService: NgxSmartModalService,
    private router: Router
  ) { }

  public ngOnInit(): void { }

  public navigateHome(): void {
    this.router.navigateByUrl('/');
  }

  public triggerModal(route: string): void {
    this.router.navigateByUrl(`/${route}`);
    this.modalService.getModal(route).open();
  }
}
