import { Component, OnInit, Input } from '@angular/core';
import { AnnotatorService, AnnotationType, WorkMode } from '../../annotator.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'annotator-stepper',
  templateUrl: './annotator-stepper.component.html',
  styleUrls: ['./annotator-stepper.component.scss']
})
export class AnnotatorStepperComponent implements OnInit {

  public AnnotationType = AnnotationType;

  public activeAnnotationType: AnnotationType;

  @Input()
  public fieldId: string;

  constructor(
    private annotatorService: AnnotatorService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  public setAnnotation(type: AnnotationType): void {
    this.activeAnnotationType = type;
    this.annotatorService.setAnnotationType(type);
  }

  public deleteAnnotation(): void {
    this.annotatorService.setAnnotationType(null);
    this.annotatorService.setWorkMode(WorkMode.Delete);
  }

  public saveMetadata(): void {
    this.annotatorService
      .saveMetadata(this.fieldId)
      .subscribe((result) => {
        console.log(result);
        this.toastr.success('Metadata saved with success', 'Metadata');
      }, (error) => {
        this.toastr.error(error, 'Metadata');
      });
  }
}
