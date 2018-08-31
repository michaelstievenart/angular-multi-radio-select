import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRadioSelectDialog } from './multi-radio-select-dialog.component';

describe('MultiRadioSelectDialogInput', () => {
  let component: MultiRadioSelectDialog;
  let fixture: ComponentFixture<MultiRadioSelectDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiRadioSelectDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiRadioSelectDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
