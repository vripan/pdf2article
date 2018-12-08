import { Component, OnInit } from '@angular/core';
import { AnnotatorService, AnnotationType } from '../annotator.service';

@Component({
  selector: 'annotator-stepper',
  templateUrl: './annotator-stepper.component.html',
  styleUrls: ['./annotator-stepper.component.scss']
})
export class AnnotatorStepperComponent implements OnInit {

  public AnnotationType = AnnotationType;

  public activeAnnotationType: AnnotationType;

  constructor(private annotatorService: AnnotatorService) { }

  ngOnInit() {
  }

  public setAnnotation(type: AnnotationType): void {
    this.activeAnnotationType = type;
    this.annotatorService.setAnnotationType(type);
  }

  public save(): void {

  }

  public discard(): void {

  }
}
