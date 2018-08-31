import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiRadioSelectControl } from './multi-radio-select-control/multi-radio-select-control.component';
import { MultiRadioSelectDialog } from './multi-radio-select-dialog/multi-radio-select-dialog.component';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  declarations: [
    MultiRadioSelectControl,
    MultiRadioSelectDialog
  ],
  exports: [
    MultiRadioSelectControl,
    MultiRadioSelectDialog
  ],
  entryComponents: [
    MultiRadioSelectControl,
    MultiRadioSelectDialog
  ]
})
export class MultiRadioSelectModule { }
