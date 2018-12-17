import { Component, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ActivatedRoute, Params } from '@angular/router';
import { AnnotatorService } from '../annotator.service';

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
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  public ngAfterViewInit(): void {
    this.route.params.subscribe((value: Params) => {
      const { id } = value;
      this.fileId = id;
      this.renderPDF(`/api/training/${id}`);
    });
  }

  public saveMetadata(): void {
    this.pdfReaderService
      .saveMetadata(this.fileId)
      .subscribe((result) => {
        console.log(result);
        this.toastr.success('Metadata saved with success', 'Metadata');
      }, (error) => {
        this.toastr.error(error, 'Metadata');
      });
  }

  private renderPDF(url: string): void {
    this.pdfReaderService.render(url)
      .then(pages =>  {
        this.pages = pages;
      })
      .catch((error) => {
        this.toastr.error(error, 'PDF reader');
      });
  }
}
