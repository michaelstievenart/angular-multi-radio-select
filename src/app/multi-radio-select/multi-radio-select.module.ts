import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiRadioSelectControl } from './multi-radio-select-control/multi-radio-select-control.component';
import { MultiRadioSelectDialog } from './multi-radio-select-dialog/multi-radio-select-dialog.component';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule
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
