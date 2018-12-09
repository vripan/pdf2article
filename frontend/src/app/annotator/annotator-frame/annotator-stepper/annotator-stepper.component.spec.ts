import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotatorStepperComponent } from './annotator-stepper.component';

describe('AnnotatorStepperComponent', () => {
  let component: AnnotatorStepperComponent;
  let fixture: ComponentFixture<AnnotatorStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotatorStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotatorStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
