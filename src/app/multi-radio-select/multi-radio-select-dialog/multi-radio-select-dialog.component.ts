import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator } from '@angular/material';
import { MultiRadioSelectDialogData } from '../model/multi-radio-select.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, map, startWith, tap } from 'rxjs/operators';
import { MultiSelectType, SelectType } from '../model/multi-radio-select-types.model';

@Component({
  selector: 'multi-radio-select-dialog',
  templateUrl: './multi-radio-select-dialog.component.html',
  styleUrls: ['./multi-radio-select-dialog.component.scss']
})
export class MultiRadioSelectDialog implements OnInit, AfterViewInit {

  typesController: MultiSelectTypesController = new MultiSelectTypesController();

  filterCtrl = new FormControl();
  filteredData: Observable<any[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataCount: number;
  pageSize: number;

  isLoading = true;
  useReset = false;

  selected: MultiSelectType [];

  constructor(public dialogRef: MatDialogRef<MultiRadioSelectDialog>,
              @Inject(MAT_DIALOG_DATA) public dialogData: MultiRadioSelectDialogData) {
  }

  ngOnInit() {
    this.setupFilterCtrl();
    this.pageSize = this.dialogData.pageSizeOption;
    this.selected = this.dialogData.previouslySelected;
    this.dialogData.dataSource.get(0, this.pageSize, 'asc');

    this.dialogData.dataSource.paginationInfo$.subscribe((count) => {
      this.dataCount = count;
    });

    this.dialogData.dataSource.data().subscribe((values) => {
      if (values && values.length > 0) {
        this.typesController.init(values, this.selected, this.paginator.pageIndex, this.pageSize);
      }
    });

    this.dialogData.dataSource.loading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  setupFilterCtrl() {
    this.filteredData = this.filterCtrl.valueChanges.pipe(
      debounceTime(250),
      startWith(''),
      map((value) => {
        return value ? this.filter(value) : this.resetFilter();
      })
    );
  }

  filter(input: string): MultiSelectType [] {
    this.typesController.viewInstance = this.typesController.instance.filter((value: MultiSelectType) => {
      const viewValue = value.selectType.viewValue.toLowerCase();
      return viewValue.indexOf(input.toLowerCase()) > -1 || viewValue.includes(input) || viewValue.match(input);
    });

    return this.typesController.viewInstance;
  }

  resetFilter(): any {
    this.typesController.copyInstance();
    return this.typesController.instance.slice();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.paginate())
      )
      .subscribe();
  }

  paginate() {
    this.dialogData.dataSource.get(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      'asc'
    );
  }

  onReset() {
    this.useReset = true;
    this.typesController.cacheForReset();
    this.typesController.reset();
  }

  onCancel() {
    this.dialogRef.close(new DialogCloseType('cancel'));
  }

  onAccept() {
    this.dialogRef.close(new DialogCloseType('accept', this.selected));
  }

  trackByFn(index: number, multi: MultiSelectType) {
    return multi.index;
  }

  onRadioChange(multi: MultiSelectType) {
    if (multi.checked) {
      this.selected.push(multi);
    } else {
      const index = this.selected.indexOf(multi);
      this.selected.splice(index, 1);
    }
  }
}
export class MultiSelectTypesController {

  private _instance: MultiSelectType [] = [];
  private _viewInstance: MultiSelectType [] = [];
  private _resetInstance: MultiSelectType [] = [];

  init(data: SelectType [],
       previouslySelected: any[],
       pageIndex: number,
       pageSizeOption: number) {

    this._viewInstance = [];
    this._instance = [];
    for (let i = 0; i < data.length; i++) {
      const index = this.getUniqueIndex(i, pageIndex, pageSizeOption);
      this._instance.push(new MultiSelectType(data[i], index, false));
    }
    this.copyInstance();
    this.updateUsingPreviouslySelected(previouslySelected);
  }

  getUniqueIndex(index: number, pageIndex: number, pageSizeOption: number) {
    return  index + (pageIndex * pageSizeOption);
  }

  get viewInstance(): MultiSelectType[] {
    return this._viewInstance;
  }

  set viewInstance(value: MultiSelectType[]) {
    this._viewInstance = value;
  }

  get instance(): MultiSelectType[] {
    return this._instance;
  }

  get resetInstance(): MultiSelectType[] {
    return this._resetInstance;
  }

  updateUsingPreviouslySelected(previouslySelected: MultiSelectType[]) {
    if (previouslySelected) {
      for (const prev of previouslySelected) {
        this.viewInstance[prev.index].checked = true;
      }
    }
  }

  copyInstance() {
    this._viewInstance = this._instance;
  }

  reset() {
    this.copyInstance();
    this._viewInstance.forEach((value) => value.checked = false);
  }

  cacheForReset() {
    this._resetInstance = [];
    for (let i = 0; i < this._instance.length; i++) {
      this._resetInstance.push(new MultiSelectType(
        this._instance[i].selectType,
        this._instance[i].index,
        this._instance[i].checked,
      ));
    }
  }
}
export class DialogCloseType {
  constructor(public type: string, public result?: any) {}
}
