import { Injectable } from '@angular/core';
import { GenericService } from '../../services/generic.service'

@Injectable({
  providedIn: 'root'
})
export class UploadMainService {

  constructor(
    private service: GenericService
  ) { }
  
  public postPDF(object: any) : any {
    let formData: FormData = new FormData();
    formData.append('file', object);
    this.service.Post('parse/upload', formData)
                .subscribe((result) => {
                  return "PDF uploaded"
                },
                (err) => {
                  return "Something went wrong";
                });
    return;
  }

}
