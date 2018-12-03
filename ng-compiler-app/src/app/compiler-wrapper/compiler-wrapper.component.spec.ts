import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompilerWrapperComponent } from './compiler-wrapper.component';

describe('CompilerWrapperComponent', () => {
  let component: CompilerWrapperComponent;
  let fixture: ComponentFixture<CompilerWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompilerWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompilerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
