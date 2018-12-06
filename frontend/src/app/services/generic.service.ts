import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private api = `${environment.api}`;

  constructor(private http: HttpClient) { }

  public Get<T>(url: string) : Observable<T> {
    return this.http.get<T>(this.api + url);
  }

  public Post<T>(url: string, data: T) : any {
    return this.http.post<T>(this.api + url, data);
  }
}
