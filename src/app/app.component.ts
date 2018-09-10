import { Component, OnInit } from '@angular/core';
import { MultiSelectDataSourceStub } from './multi-radio-select/multi-select-data-source.stub';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  dataSource: MultiSelectDataSourceStub;
  value: any;

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource =  new MultiSelectDataSourceStub();
  }

  output($value) {
    this.value = $value;
  }
}
