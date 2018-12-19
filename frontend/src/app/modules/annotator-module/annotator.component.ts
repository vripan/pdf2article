import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnnotatorService } from './annotator.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.scss']
})
export class AnnotatorComponent implements OnInit, OnDestroy {

  public trainingFiles: string[];

  private trainingSubscription: Subscription;

  constructor (
    private toastr: ToastrService,
    private annotatorService: AnnotatorService
  ) { }

  public ngOnInit(): void {
    this.trainingSubscription = this.annotatorService.getTrainingData()
      .subscribe((files: string[]) => {
        this.trainingFiles = files;
      }, (error) => {
        this.toastr.error(error, 'Training');
      });
  }

  public ngOnDestroy(): void {
    this.trainingSubscription.unsubscribe();
  }
}
