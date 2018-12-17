import { Injectable } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private genericService: GenericService) {}

  public getAnalyzedDocs() : Observable<any> {
    return this.genericService.Get('training\\history');
  }
}
