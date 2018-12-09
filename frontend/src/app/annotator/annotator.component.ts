import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnnotatorService } from './annotator.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.scss']
})
export class AnnotatorComponent implements OnInit, OnDestroy {

  public trainingFiles: string[];

  private trainingSubscription: Subscription;

  constructor(private annotatorService: AnnotatorService) { }

  public ngOnInit(): void {
    this.trainingSubscription = this.annotatorService.getTrainingData()
      .subscribe((files: string[]) => {
        this.trainingFiles = files;
      });
  }

  public ngOnDestroy(): void {
    this.trainingSubscription.unsubscribe();
  }

}
