import { CollectionViewer, DataSource } from '@angular/cdk/typings/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';

abstract class MultiSelectDataSource<T> implements DataSource<T> {

  private loading = new BehaviorSubject<boolean>(false);
  public loading$ = this.loading.asObservable();
  private dataValues = new BehaviorSubject<T []>([]);
  public data$ = this.dataValues.asObservable();
  private paginationInfo =  new BehaviorSubject<number>(0);
  public paginationInfo$ = this.paginationInfo.asObservable();

  abstract get(pageNumber: number,
               pageSize: number,
               sortOrder: string);

  connect(collectionViewer: CollectionViewer): Observable<T []> {
    return this.dataValues.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataValues.complete();
    this.loading.complete();
  }

  next(value: T []) {
    this.dataValues.next(value);
  }

  dataCount(count: number) {
    this.paginationInfo.next(count);
  }

  isLoading() {
    this.loading.next(true);
  }

  isLoadingComplete() {
    this.loading.next(false);
  }

  data(): Observable<T []> {
    return this.dataValues;
  }
}

export { MultiSelectDataSource } ;

