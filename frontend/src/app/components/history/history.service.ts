import { Injectable } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  // private documentInformationArray : Array<HistoryElement>;
  constructor(private genericService: GenericService) {}

  public getAnalyzedDocs() : Promise<any> {
    return this.genericService.Get('api\\training');
  // this.documentInformationArray = [
  //   {name: "UserName", size: 212396, author: "AuthorName", upload_time: 4.4325},
  //   {name: "UserName", size: 212396, author: "AuthorName", upload_time: 4.4325},
  //   {name: "UserName", size: 212396, author: "AuthorName", upload_time: 4.4325},
  //   {name: "UserName", size: 212396, author: "AuthorName", upload_time: 4.4325},
  //   {name: "UserName", size: 212396, author: "AuthorName", upload_time: 4.4325},
  //   {name: "UserName", size: 212396, author: "AuthorName", upload_time: 4.4325},
  //   {name: "UserName", size: 212396, author: "AuthorName", upload_time: 4.4325},
  //   {name: "UserName", size: 212396, author: "AuthorName", upload_time: 4.4325},
  //   {name: "UserName", size: 212396, author: "AuthorName", upload_time: 4.4325},
  // ];
  }
}
