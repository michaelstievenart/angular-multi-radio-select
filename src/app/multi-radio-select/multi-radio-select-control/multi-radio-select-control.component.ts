import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { MultiRadioSelectControlModel, MultiRadioSelectDialogModel } from '../model/multi-radio-select.model';
import { MultiSelectDataSource } from '../data-source/multi-select-data-source';
import { MatDialog } from '@angular/material';
import { MultiRadioSelectDialog } from '../multi-radio-select/multi-radio-select-dialog.component';

@Component({
  selector: 'multi-radio-select-control',
  templateUrl: './multi-radio-select-control.component.html',
  styleUrls: ['./multi-radio-select-control.component.scss'],
})
export class MultiRadioSelectControl implements OnInit {

  @Input() multiRadioSelectControlModel: MultiRadioSelectControlModel;
  @Input() multiRadioSelectDialogModel: MultiRadioSelectDialogModel;
  @Input() dataSource: MultiSelectDataSource<any>;
  @Input() previouslySelected: any[];

  @Output() selectionResult: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog() {
    const win = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      width = win.innerWidth || e.clientWidth || g.clientWidth,
      height = win.innerHeight || e.clientHeight || g.clientHeight;

    const dialogRef = this.dialog.open(MultiRadioSelectDialog, {
      width: `${width / 2}px`,
      minWidth: `${this.multiRadioSelectDialogModel.minWidth}px`,
      maxWidth: `${this.multiRadioSelectDialogModel.maxWidth}px`,
      minHeight: `${this.multiRadioSelectDialogModel.minHeight}px`,
      maxHeight: `${this.multiRadioSelectDialogModel.maxHeight}px`,
      disableClose: this.multiRadioSelectDialogModel.disableClose,
      data: {
        dataSource: this.dataSource,
        previouslySelected: this.previouslySelected,
        dialogTitle: this.multiRadioSelectDialogModel.dialogTitle,
        searchControlPlaceHolder: this.multiRadioSelectDialogModel.searchControlPlaceHolder
      }
    });
  }
}
