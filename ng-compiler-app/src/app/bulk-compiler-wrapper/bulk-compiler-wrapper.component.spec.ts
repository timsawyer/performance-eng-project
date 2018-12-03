import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkCompilerWrapperComponent } from './bulk-compiler-wrapper.component';

describe('BulkCompilerWrapperComponent', () => {
  let component: BulkCompilerWrapperComponent;
  let fixture: ComponentFixture<BulkCompilerWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkCompilerWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkCompilerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
