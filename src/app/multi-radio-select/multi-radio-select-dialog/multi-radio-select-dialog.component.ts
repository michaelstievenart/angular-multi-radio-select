import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator } from '@angular/material';
import { DialogCloseType, MultiRadioSelectDialogData } from '../model/multi-radio-select.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, map, startWith, tap } from 'rxjs/operators';
import { MultiSelectType, SelectType, UniqueIndex } from '../model/multi-radio-select-types.model';

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

  tempSelected: MultiSelectType [] = [];
  selected: MultiSelectType [];
  currentPageIndex = 0;

  constructor(public dialogRef: MatDialogRef<MultiRadioSelectDialog>,
              @Inject(MAT_DIALOG_DATA) public dialogData: MultiRadioSelectDialogData) {
  }

  ngOnInit() {
    this.setupFilterCtrl();
    this.pageSize = this.dialogData.pageSizeOption;
    this.selected = this.dialogData.previouslySelected;
    this.tempSelected = [...this.selected];
    this.dialogData.dataSource.get(this.paginator.pageIndex, this.pageSize, 'asc');

    this.dialogData.dataSource.paginationInfo$.subscribe((count) => {
      this.dataCount = count;
    });

    this.dialogData.dataSource.data().subscribe((values) => {
      if (values && values.length > 0) {
        this.typesController.init(values, [...this.selected, ...this.tempSelected], this.currentPageIndex, this.pageSize);
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
    this.currentPageIndex = this.paginator.pageIndex;
    this.dialogData.dataSource.get(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      'asc'
    );
  }

  onReset() {
    this.tempSelected = [];
    this.typesController.reset();
  }

  onCancel() {
    this.dialogRef.close(new DialogCloseType('cancel'));
  }

  onAccept() {
    this.selected = [...this.tempSelected];
    this.dialogRef.close(new DialogCloseType('accept', this.selected));
  }

  trackByFn(index: number, multi: MultiSelectType) {
    return multi.uniqueIndex.index;
  }

  onRadioChange(multi: MultiSelectType) {
    if (multi.checked) {
      this.tempSelected.push(multi);
    } else {
      let index;
      for (const select of this.tempSelected) {
        if (select.uniqueIndex.index === multi.uniqueIndex.index && select.uniqueIndex.pageIndex === multi.uniqueIndex.pageIndex) {
          index = this.tempSelected.indexOf(select);
          break;
        }
      }
      this.tempSelected.splice(index, 1);
    }
  }
}
export class MultiSelectTypesController {

  private _instance: MultiSelectType [] = [];
  private _viewInstance: MultiSelectType [] = [];

  init(data: SelectType [],
       previouslySelected: any[],
       pageIndex: number,
       pageSizeOption: number) {

    this._viewInstance = [];
    this._instance = [];
    for (let i = 0; i < data.length; i++) {
      const index = this.getUniqueIndex(i, pageIndex, pageSizeOption);
      this._instance.push(new MultiSelectType(data[i], new UniqueIndex(index, pageIndex), false));
    }
    this.copyInstance();
    this.updateUsingPreviouslySelected(previouslySelected, pageIndex, pageSizeOption);
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

  updateUsingPreviouslySelected(previouslySelected: MultiSelectType[],
                                currentPageIndex: number,
                                pageSizeOption: number) {
    if (previouslySelected) {
      for (const prev of previouslySelected) {
        if (prev.uniqueIndex.pageIndex === currentPageIndex) {
          this.viewInstance[prev.uniqueIndex.index - (currentPageIndex * pageSizeOption)].checked = true;
        }
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
}

