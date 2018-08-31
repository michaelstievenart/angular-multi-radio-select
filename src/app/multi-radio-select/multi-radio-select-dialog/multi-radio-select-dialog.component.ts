import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MultiRadioSelectDialogData } from '../model/multi-radio-select.model';

@Component({
  selector: 'multi-radio-select-dialog',
  templateUrl: './multi-radio-select-dialog.component.html',
  styleUrls: ['./multi-radio-select-dialog.component.scss']
})
export class MultiRadioSelectDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<MultiRadioSelectDialog>,
              @Inject(MAT_DIALOG_DATA) public dialogData: MultiRadioSelectDialogData) { }

  ngOnInit() {
  }

  onCancel() {
    this.dialogRef.close();
  }

  onAccept() {
    this.dialogRef.close();
  }
}
