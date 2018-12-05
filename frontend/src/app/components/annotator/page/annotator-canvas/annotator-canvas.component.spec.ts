import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotatorCanvasComponent } from './annotator-canvas.component';

describe('AnnotatorCanvasComponent', () => {
  let component: AnnotatorCanvasComponent;
  let fixture: ComponentFixture<AnnotatorCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotatorCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotatorCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
