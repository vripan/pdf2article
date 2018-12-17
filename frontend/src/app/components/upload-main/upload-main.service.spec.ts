import { TestBed } from '@angular/core/testing';

import { UploadMainService } from './upload-main.service';

describe('UploadMainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadMainService = TestBed.get(UploadMainService);
    expect(service).toBeTruthy();
  });
});
