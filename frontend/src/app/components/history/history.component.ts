import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export interface HistoryElement {
  name: string;
  size: number;
  author: string;
  upload_time: number;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  // public analyzedDocs: Array<HistoryElement>;
  public analyzedDocs: Array<any>;
  private historySubscription: Subscription;

  constructor (
    private toastr: ToastrService,
    // private historyService: HistoryService
  ) { }

  ngOnInit() {
    // this.historySubscription = this.historyService.getAnalyzedDocs()
    //   .subscribe((history: string[]) => {
    //     this.analyzedDocs = history;
    //   }, (error) => {
    //     this.toastr.error(error, 'History importing error');
    //   });

    // this.historyService.getAnalyzedDocs().subscribe(
    //   data => {
    //     this.analyzedDocs = data;
    //   },
    //   error => console.log(error)
    // );

    this.analyzedDocs = [
      {name: 'Metamorphosis', size: 21, author: 'Franz Kafka', upload_time: 4.4325},
      {name: 'The Stranger', size: 12, author: 'Albert Camus', upload_time: 4.4325},
      {name: 'On The Road', size: 22, author: 'Jack Kerouac', upload_time: 4.4325},
    ];
  }

  // public ngOnDestroy(): void {
  //   this.historySubscription.unsubscribe();
  // }
}
