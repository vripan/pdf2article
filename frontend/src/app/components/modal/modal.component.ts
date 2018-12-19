import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  constructor(public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() { }
}
