interface MultiRadioSelectDialogModel {
  searchControlPlaceHolder: string;
  dialogTitle: string;
  disableClose?: boolean;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

interface MultiRadioSelectControlModel {
  placeHolder: string;
}

export { MultiRadioSelectDialogModel, MultiRadioSelectControlModel};
