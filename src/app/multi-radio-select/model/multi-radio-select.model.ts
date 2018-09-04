import { MultiSelectDataSource } from '../data-source/multi-select-data-source';

interface MultiRadioSelectDialogInput {
  searchControlPlaceHolder: string;
  dialogTitle: string;
  dataSource: MultiSelectDataSource<any>;
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
}

export { MultiRadioSelectDialogInput, MultiRadioSelectControlInput, MultiRadioSelectDialogData };
