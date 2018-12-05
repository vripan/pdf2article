import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfCanvasComponent } from './pdf-canvas.component';

describe('PdfCanvasComponent', () => {
  let component: PdfCanvasComponent;
  let fixture: ComponentFixture<PdfCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
