import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRadioSelectFormControl } from './multi-radio-select-form-control.component';

describe('MultiRadioSelectFormControl', () => {
  let component: MultiRadioSelectFormControl;
  let fixture: ComponentFixture<MultiRadioSelectFormControl>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiRadioSelectFormControl ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiRadioSelectFormControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
