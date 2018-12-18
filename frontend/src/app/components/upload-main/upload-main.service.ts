import { Injectable } from '@angular/core';
import { GenericService } from '../../services/generic.service'
import { resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class UploadMainService {

  constructor(
    private service: GenericService
  ) { }

  public async postPDF(object: any) {
    let formData: FormData = new FormData();
    formData.append('file', object);
    let result: Object = await this.service.Post('parse/upload', formData)
      .then(result => result);
    return JSON.parse(JSON.stringify(result));
  }
}

