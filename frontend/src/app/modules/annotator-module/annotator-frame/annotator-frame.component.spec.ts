import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotatorFrameComponent } from './annotator-frame.component';

describe('AnnotatorFrameComponent', () => {
  let component: AnnotatorFrameComponent;
  let fixture: ComponentFixture<AnnotatorFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotatorFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotatorFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
