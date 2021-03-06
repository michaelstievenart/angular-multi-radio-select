import { MultiSelectDataSource } from '../data-source/multi-select-data-source';

interface MultiRadioSelectDialogInput {
  searchControlPlaceHolder: string;
  dialogTitle: string;
  disableClose?: boolean;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

interface MultiRadioSelectControlInput {
  placeHolder: string;
}

interface MultiRadioSelectDialogData {
  dialogTitle: string;
  searchControlPlaceHolder: string;
  dataSource: MultiSelectDataSource<any>;
  previouslySelected: any;
  pageSizeOption: number;
}

class DialogCloseType {
  constructor(public type: string, public result?: any) {}
}

export { MultiRadioSelectDialogInput, MultiRadioSelectControlInput, MultiRadioSelectDialogData, DialogCloseType };
