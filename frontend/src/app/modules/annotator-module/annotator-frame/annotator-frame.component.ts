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

  public totalPages: number = 0;

  public pageSize: number = 5;

  public hasFetchPages: boolean = false;

  constructor(
    private pdfReaderService: AnnotatorService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  public ngAfterViewInit(): void {
    this.route.params.subscribe((value: Params) => {
      const { id } = value;
      this.fileId = id;
      this.renderPDF(`/api/training/${id}`); // TODO remove after fix
      this.pdfReaderService.getAnnotationMetadata(id)
        .subscribe(annotations => {
          const annotResp = annotations as any;
          if (annotResp.payload) {
            this.pdfReaderService.setServerAnnotations(annotResp.payload);
          }
        }, (error) => {
          this.toastr.error(error, 'Error on loading server adnotations');
        });
    });
  }

  public onPageEvent(event) {
    console.log(event);
    const { pageIndex, length, pageSize } = event;

    if (!this.hasFetchPages) return;

    const pages = Array(pageSize).fill(0).map((i, index) => (index + 1) + pageIndex * pageSize)
      .filter(page => page <= length);

    this.fetchPages(pages)
  }

  private fetchPages(pages: number[]) {
    this.pdfReaderService.fetchPages(pages)
      .then(pdfPages => {
        this.pages = pdfPages;
      })
      .catch(error => {
        this.toastr.error(error, 'PDF reader Fetch Pages');
      });
  }

  private fetchPDF(url: string) {
    return this.pdfReaderService.fetchPDF(url)
      .then(() => {
        this.totalPages = this.pdfReaderService.getPDFInfo().numPages;
        return this.hasFetchPages = true;
      })
      .catch(error => {
        this.toastr.error(error, 'PDF reader Fetch Doc');
      });
  }

  private renderPDF(url: string): void {
    this.fetchPDF(url)
      .then(() => {
        this.fetchPages([1, 2, 3, 4, 5])
      })
      .catch((error) => {
        this.toastr.error(error, 'PDF reader');
      });
  }
}
