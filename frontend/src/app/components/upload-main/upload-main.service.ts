import { Injectable } from '@angular/core';
import { GenericService } from '../../services/generic.service'

@Injectable({
  providedIn: 'root'
})
export class UploadMainService {

  constructor(
    private service: GenericService
  ) { }
  
  public postPDF(object: any) : string {
    this.service.Post('PLACE HOLDER', object)
                .subscribe((result) => {
                  return "PDF uploaded"
                },
                (err) => {
                  return "Something went wrong";
                });
    return;
  }

}
