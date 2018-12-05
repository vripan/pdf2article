import { Component, OnInit, Input } from '@angular/core';

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

  private scale: number = 2;

  constructor() { }

  public ngOnInit(): void {
    this.viewport = this.page.getViewport(this.scale);
  }

}
