import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogCloseType, MultiRadioSelectControlInput, MultiRadioSelectDialogInput } from '../model/multi-radio-select.model';
import { MultiSelectDataSource } from '../data-source/multi-select-data-source';
import { MatDialog } from '@angular/material';
import { MultiRadioSelectDialog } from '../multi-radio-select-dialog/multi-radio-select-dialog.component';
import { MultiSelectType } from '../model/multi-radio-select-types.model';

@Component({
  selector: 'multi-radio-select-control',
  templateUrl: './multi-radio-select-control.component.html',
  styleUrls: ['./multi-radio-select-control.component.scss'],
})
export class MultiRadioSelectControl implements OnInit {

  @Input() multiRadioSelectControlInput: MultiRadioSelectControlInput;
  @Input() multiRadioSelectDialogInput: MultiRadioSelectDialogInput;
  @Input() dataSource: MultiSelectDataSource<any>;

  @Output() selectionResult: EventEmitter<string[]> = new EventEmitter<string[]>();

  private previouslySelected: any[] = [];
  private pageSizeOption = 500;

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
      width: `${width * 0.8}px`,
      height: `${height * 0.8}px`,
      minWidth: `${this.multiRadioSelectDialogInput.minWidth}px`,
      maxWidth: `${this.multiRadioSelectDialogInput.maxWidth}px`,
      minHeight: `${this.multiRadioSelectDialogInput.minHeight}px`,
      maxHeight: `${this.multiRadioSelectDialogInput.maxHeight}px`,
      disableClose: this.multiRadioSelectDialogInput.disableClose,
      data: {
        dialogTitle: this.multiRadioSelectDialogInput.dialogTitle,
        searchControlPlaceHolder: this.multiRadioSelectDialogInput.searchControlPlaceHolder,
        dataSource: this.dataSource,
        previouslySelected: this.previouslySelected,
        pageSizeOption: this.pageSizeOption
      }
    });

    dialogRef.afterClosed().subscribe((dialogCloseType: DialogCloseType) => {
      if (dialogCloseType.type === 'accept') {
        this.previouslySelected = dialogCloseType.result;
        const output = [];
        this.previouslySelected.forEach((value: MultiSelectType) => {
          output.push(value.selectType.value);
        });
        this.selectionResult.emit(output);
      }
    });
  }
}
