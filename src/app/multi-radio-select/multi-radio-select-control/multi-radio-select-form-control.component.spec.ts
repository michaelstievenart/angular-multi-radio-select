import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRadioSelectControl } from './multi-radio-select-control.component';

describe('MultiRadioSelectControlInput', () => {
  let component: MultiRadioSelectControl;
  let fixture: ComponentFixture<MultiRadioSelectControl>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiRadioSelectControl ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiRadioSelectControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
