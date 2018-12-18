import { Component, OnInit } from '@angular/core';
// import { HistoryService } from './history.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export interface HistoryElement{
  name: string,
  size: number,
  author: string,
  upload_time: number
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  // public analyzedDocs: Array<HistoryElement>;
  public analyzedDocs : Array<any>;
  private historySubscription: Subscription;

  // constructor (private toastr: ToastrService, private historyService: HistoryService) { }
  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    // this.historySubscription = this.historyService.getAnalyzedDocs()
    //   .subscribe((historyfromAPI: string[]) => {
    //     this.analyzedDocs = historyfromAPI;
    //   }, (error) => {
    //     this.toastr.error(error, 'History importing error');
    //   });
    
    // this.historyService.getAnalyzedDocs().subscribe(
    //   datafromAPI => {
    //     this.analyzedDocs = datafromAPI;
    //   },
    //   error => console.log(error)
    // );
      
    this.analyzedDocs = [
      {name: "Metamorphosis", size: 21, author: "Franz Kafka", upload_time: 4.4325},
      {name: "The Stranger", size: 12, author: "Albert Camus", upload_time: 4.4325},
      {name: "On The Road", size: 22, author: "Jack Kerouac", upload_time: 4.4325},
      // {name: "UserName", size: 212396, author: "AuthorName", upload_time: 4.4325},
      // {name: "UserName", size: 212396, author: "AuthorName", upload_time: 4.4325},
      // {name: "UserName", size: 212396, author: "AuthorName", upload_time: 4.4325},
      // {name: "UserName", size: 212396, author: "AuthorName", upload_time: 4.4325},
      // {name: "UserName", size: 212396, author: "AuthorName", upload_time: 4.4325},
      // {name: "UserName", size: 212396, author: "AuthorName", upload_time: 4.4325}
    ];
  }
  
  // public ngOnDestroy(): void {
  //   this.historySubscription.unsubscribe();
  // }
}
