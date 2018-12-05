import { TestBed } from '@angular/core/testing';

import { PdfReaderService } from './pdf-reader.service';

describe('PdfReaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdfReaderService = TestBed.get(PdfReaderService);
    expect(service).toBeTruthy();
  });
});
