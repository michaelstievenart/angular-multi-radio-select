import { catchError, finalize, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MultiSelectDataSource } from './data-source/multi-select-data-source';
import { SelectType } from './model/multi-radio-select-types.model';

class MultiSelectDataSourceStub extends MultiSelectDataSource<SelectType> {

  get(pageNumber: number,
      pageSize: number,
      sortOrder: string) {
    this.isLoading();
    setTimeout(() => {
      const data = Data.get();
      const page = Pager.getPage(data, pageNumber, pageSize);
      of({ body: { result: page, count: data.length } }).pipe(
        map((res: any) => {
          return res.body;
        })
      ).pipe(
        catchError(() => of([])),
        finalize(() => this.isLoadingComplete())
      ).subscribe((resultSet: any) => {
        this.next(resultSet.result);
        this.dataCount(resultSet.count);
      });
    }, 250);
  }
}

class Pager {
  static getPage(data: Array<any>,
          pageNumber: number,
          pageSize: number): Array<any> {
    const checkOffset = (pageSize * pageNumber);
    const start = checkOffset < 0 ? 0 : checkOffset;
    return data.slice(start, (pageNumber + 1) * pageSize);
  }
}

export class Data {
  static get() {
    const data = [];
    for (let i = 0; i < 10000; i++) {
      data.push({value: 'T' + i, viewValue: i + ' Test Value that is very long and that will overflow'});
    }
    return data;
  }
}

export { MultiSelectDataSourceStub };
