import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @Input()
  public page: any;

  @Input()
  public viewport: any;

  @HostBinding('style.width')
  public width: string;

  public index: number;

  private scale: number = 1;

  constructor() { }

  public ngOnInit(): void {
    this.index = this.page.pageIndex;
    this.viewport = this.page.getViewport(this.scale);
    this.width = `${this.viewport.width}px`;
  }
}
