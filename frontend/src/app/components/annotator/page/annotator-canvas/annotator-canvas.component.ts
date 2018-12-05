import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'annotator-canvas',
  templateUrl: './annotator-canvas.component.html',
  styleUrls: ['./annotator-canvas.component.scss']
})
export class AnnotatorCanvasComponent implements OnInit {

  @Input()
  public viewport: any;

  constructor() { }

  ngOnInit() {
  }

}
