import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiRadioSelectFormControl } from './multi-radio-select-control/multi-radio-select-form-control.component';
import { MultiRadioSelectDialog } from './multi-radio-select/multi-radio-select-dialog.component';
import { MatDialogModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatSelectModule
  ],
  declarations: [
    MultiRadioSelectFormControl,
    MultiRadioSelectDialog
  ],
  exports: [
    MultiRadioSelectFormControl,
    MultiRadioSelectDialog
  ],
  entryComponents: [
    MultiRadioSelectFormControl,
    MultiRadioSelectDialog
  ]
})
export class MultiRadioSelectModule { }
