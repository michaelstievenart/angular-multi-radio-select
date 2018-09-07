class MultiSelectType {
  constructor(public selectType: SelectType,
              public uniqueIndex: UniqueIndex,
              public checked: boolean) {
  }
}
interface SelectType {
  value: string;
  viewValue: string;
}

export class UniqueIndex {
  constructor(public index: number,
              public pageIndex: number){}
}

export { MultiSelectType, SelectType };
