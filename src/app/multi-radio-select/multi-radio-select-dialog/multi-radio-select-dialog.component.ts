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

  typesController: MultiSelectTypesController;

  filterCtrl = new FormControl();
  filteredData: Observable<any[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataCount: number;
  pageSize: number;

  isLoading = true;

  constructor(public dialogRef: MatDialogRef<MultiRadioSelectDialog>,
              @Inject(MAT_DIALOG_DATA) public dialogData: MultiRadioSelectDialogData) {
  }

  ngOnInit() {
    this.typesController = new MultiSelectTypesController();
    this.setupFilterCtrl();

    this.dialogData.dataSource.get(0, 500, 'asc');
    this.dialogData.dataSource.paginationInfo$.subscribe((count) => {
      this.dataCount = count;
      this.pageSize = (count < 500 ? 100 : 500);
    });
    this.dialogData.dataSource.data().subscribe((values) => {
      this.typesController.init(values, this.dialogData.previouslySelected);
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


  filter(value: any): any {
    return;
  }

  resetFilter(): any {
    return;
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
  
  onCancel() {
    this.dialogRef.close();
  }

  onAccept() {
    this.dialogRef.close();
  }

  trackByFn(index: number, multi: MultiSelectType) {
    return multi.index;
  }
}
export class MultiSelectTypesController {

  private _instance: MultiSelectType [] = [];
  private _viewInstance: MultiSelectType [] = [];
  private _resetInstance: MultiSelectType [] = [];

  init(data: SelectType [], previouslySelected: any[]) {
    this._viewInstance = [];
    this._instance = [];
    for (let i = 0; i < data.length; i++) {
      this._instance.push(new MultiSelectType(data[i], i, false));
    }
    this.copyInstance();
    this.updateUsingPreviouslySelected(previouslySelected);
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

  updateUsingPreviouslySelected(previouslySelected: any[]) {
    if (previouslySelected) {
      for (const prev of previouslySelected) {
        this.viewInstance[prev.index].checked = true;
      }
    }
  }

  copyInstance() {
    this._viewInstance = this._instance;
    console.log(this._viewInstance);
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
