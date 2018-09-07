import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { MultiRadioSelectDialog, MultiSelectTypesController } from './multi-radio-select-dialog.component';
import { MultiSelectType, UniqueIndex } from '../model/multi-radio-select-types.model';
import {
  MAT_DIALOG_DATA,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDialogRef,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Data, MultiSelectDataSourceStub } from '../multi-select-data-source.stub';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiRadioSelectDialogData } from '../model/multi-radio-select.model';

describe('MultiRadioSelectDialog', () => {
  let component: MultiRadioSelectDialog;
  let fixture: ComponentFixture<MultiRadioSelectDialog>;
  const prevSelectedValue = new MultiSelectType({value: 'The Batman', viewValue: 'Bruce Wayne'}, new UniqueIndex(0, 0), true);
  const dialogData: MultiRadioSelectDialogData = {
    dialogTitle: 'Test title',
    searchControlPlaceHolder: 'Test Search control place holder',
    dataSource: new MultiSelectDataSourceStub(),
    previouslySelected: [prevSelectedValue],
    pageSizeOption: 500
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MultiRadioSelectDialog
      ],
      imports: [
        MatAutocompleteModule,
        MatInputModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatDialogModule,
        MatPaginatorModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: dialogData}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiRadioSelectDialog);
    component = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should set selected to previously selected', () => {
      component.ngOnInit();
      expect(component.selected).toEqual(
        [prevSelectedValue]
      );
    });

    it('should call MultiSelectTypesController init', fakeAsync(() => {
      component.ngOnInit();
      flush();
      const expected = component.typesController.instance;
      const actual = buildIndexArray(0, 500);
      actual[prevSelectedValue.uniqueIndex.index].checked = prevSelectedValue.checked;
      expect(expected).toEqual(actual);
    }));

    it('should create a unique index that relates to pageIndex and pageSizeOption', fakeAsync(() => {
      const controller = new MultiSelectTypesController();
      const pageSizeOption = 500;
      const case1 = controller.getUniqueIndex(0, 0, pageSizeOption);
      const case2 = controller.getUniqueIndex(0, 1, pageSizeOption);
      const case3 = controller.getUniqueIndex(0, 2, pageSizeOption);

      const case4 = controller.getUniqueIndex(pageSizeOption - 1, 0, pageSizeOption);
      const case5 = controller.getUniqueIndex(pageSizeOption - 1, 1, pageSizeOption);
      const case6 = controller.getUniqueIndex(pageSizeOption - 1, 2, pageSizeOption);

      expect(case1).toEqual(0);
      expect(case2).toEqual(500);
      expect(case3).toEqual(1000);

      expect(case4).toEqual(499);
      expect(case5).toEqual(999);
      expect(case6).toEqual(1499);
    }));
  });

  describe('onRadioChange', () => {
    it('should add an item to selected array', () => {
      const current = new MultiSelectType({value: 'The Batman', viewValue: 'Bruce Wayne'}, new UniqueIndex(0, 0), true);
      component.selected = [current];
      const update = new MultiSelectType({value: 'The Flash', viewValue: 'Flash Gordan'}, new UniqueIndex(1, 0), true);
      component.onRadioChange(update);

      expect(component.selected).toEqual([current, update]);
    });

    it('should remove an item to selected array', () => {
      const data1 = new MultiSelectType({value: 'The Batman', viewValue: 'Bruce Wayne'}, new UniqueIndex(0, 0), true);
      const data2 = new MultiSelectType({value: 'The Batman 2', viewValue: 'Bruce Wayne'}, new UniqueIndex(1, 0), true);
      const data3 = new MultiSelectType({value: 'The Batman 3', viewValue: 'Bruce Wayne'}, new UniqueIndex(2, 0), true);
      component.selected = [data1, data2, data3];
      data1.checked = false;
      component.onRadioChange(data1);

      expect(component.selected).toEqual([data2, data3]);
    });
  });
});

function buildIndexArray(pageIndex: number, pageSizeOption: number) {
  const data = Data.get();
  const output = [];
  for (let i = (pageIndex * pageSizeOption); i < ((pageIndex * pageSizeOption) + pageSizeOption); i++) {
    const index = i + (pageIndex * pageSizeOption);
    output.push(new MultiSelectType(data[i], new UniqueIndex(index, pageIndex), false));
  }
  return output;
}
