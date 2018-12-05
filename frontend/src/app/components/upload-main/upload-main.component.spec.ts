import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMainComponent } from './upload-main.component';

describe('UploadMainComponent', () => {
  let component: UploadMainComponent;
  let fixture: ComponentFixture<UploadMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
