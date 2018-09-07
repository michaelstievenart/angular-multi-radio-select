import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRadioSelectControl } from './multi-radio-select-control.component';
import { MatDialogModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { Component, ViewChild } from '@angular/core';
import { MultiSelectDataSourceStub } from '../multi-select-data-source.stub';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('MultiRadioSelectControlInput', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MultiRadioSelectControl,
        TestHostComponent
      ],
      imports: [
        MatSelectModule,
        MatFormFieldModule,
        MatDialogModule,
        NoopAnimationsModule
      ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have set properties', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: `host-component`,
    template: `<multi-radio-select-control
      [dataSource]="dataSource"
      [multiRadioSelectControlInput]="{ placeHolder: 'Custom Control' }"
      [multiRadioSelectDialogInput]="{
          searchControlPlaceHolder: 'Custom Place Holder',
          dialogTitle: 'Multi Radio Select Title',
          disableClose: true,
          minWidth: 400,
          minHeight: 800,
          maxWidth: 800,
          maxHeight: 800
          }"
    ></multi-radio-select-control>`
  })
  class TestHostComponent {
    @ViewChild(MultiRadioSelectControl)
    public componentUnderTestComponent: MultiRadioSelectControl;
    dataSource =  new MultiSelectDataSourceStub();
  }
});
