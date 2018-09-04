class MultiSelectType {
  constructor(public selectType: SelectType,
              public index: number,
              public checked: boolean) {
  }
}
interface SelectType {
  value: string;
  viewValue: string;
}

export { MultiSelectType, SelectType };
