import { Component, AfterViewInit } from '@angular/core';

import { AnnotatorService } from '../annotator.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'annotator-frame',
  templateUrl: './annotator-frame.component.html',
  styleUrls: ['./annotator-frame.component.scss']
})
export class AnnotatorFrameComponent implements AfterViewInit {

  public pages: any[] = [];

  public fileId: string;

  constructor(
    private pdfReaderService: AnnotatorService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

  }

  public ngAfterViewInit(): void {
    this.route.params.subscribe((value: Params) => {
      const { id } = value;
      this.fileId = id;
      this.renderPDF(`/api/training/${id}`);
    });
  }

  public saveMetadata(): void {
    this.pdfReaderService.saveMetadata(this.fileId)
      .subscribe((result) => {
        console.log(result);
      });
  }

  private renderPDF(url: string): void {
    this.pdfReaderService.render(url)
      .then(pages =>  {
        this.pages = pages;
      });
  }

}
