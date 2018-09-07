import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRadioSelectDialog } from './multi-radio-select-dialog.component';
import { MultiSelectType } from '../model/multi-radio-select-types.model';
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

describe('MultiRadioSelectDialog', () => {
  let component: MultiRadioSelectDialog;
  let fixture: ComponentFixture<MultiRadioSelectDialog>;
  const dialogData = {
    dialogTitle: 'Test title',
    searchControlPlaceHolder: 'Test Search control place holder',
    dataSource: new MultiSelectDataSourceStub(),
    previouslySelected: [new MultiSelectType({value: 'The Batman', viewValue: 'Bruce Wayne'}, 0, true)],
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
    fixture.detectChanges();
  });

  describe('OnInit', () => {
    it('should set selected to previously selected', () => {
      component.typesController.init(Data.get(), []);

      component.ngOnInit();
      expect(component.selected).toEqual(
        [new MultiSelectType({value: 'The Batman', viewValue: 'Bruce Wayne'}, 0, true)]
      );
    });
  });

  describe('onRadioChange', () => {
    it('should add an item to selected array', () => {
      const current = new MultiSelectType({value: 'The Batman', viewValue: 'Bruce Wayne'}, 0, true);
      component.selected = [current];
      const update = new MultiSelectType({value: 'The Flash', viewValue: 'Flash Gordan'}, 0, true);
      component.onRadioChange(update);

      expect(component.selected).toEqual([current, update]);
    });

    it('should remove an item to selected array', () => {
      const data1 = new MultiSelectType({value: 'The Batman', viewValue: 'Bruce Wayne'}, 0, true);
      const data2 = new MultiSelectType({value: 'The Batman 2', viewValue: 'Bruce Wayne'}, 1, true);
      const data3 = new MultiSelectType({value: 'The Batman 3', viewValue: 'Bruce Wayne'}, 2, true);
      component.selected = [data1, data2, data3];
      data1.checked = false;
      component.onRadioChange(data1);

      expect(component.selected).toEqual([data2, data3]);
    });
  });
});
