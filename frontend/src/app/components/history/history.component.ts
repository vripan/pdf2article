import { Component, OnInit, OnDestroy } from '@angular/core';
import { HistoryService } from './history.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  private analyzedDocs: any;
  private historySubscription: Subscription;

  constructor (private toastr: ToastrService, private historyService: HistoryService) { }

  ngOnInit() {
    // this.historySubscription = this.historyService.getAnalyzedDocs()
    //   .subscribe((historyfromAPI: string[]) => {
    //     this.analyzedDocs = historyfromAPI;
    //   }, (error) => {
    //     this.toastr.error(error, 'History importing error');
    //   });
    this.historyService.getAnalyzedDocs().subscribe(datafromAPI => {
      this.analyzedDocs = datafromAPI;
    });
  }
  
  public ngOnDestroy(): void {
    this.historySubscription.unsubscribe();
  }
}
