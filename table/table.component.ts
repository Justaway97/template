import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() headers: any[];
  @Input() dataSource: any[];
  @Output() onTableChange = new EventEmitter();
  @Output() rowOption = new EventEmitter();

  header: string[];

  // checkbox
  checkboxValue: any[] = [];
  checkboxOptions: any[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChange) {
    this.dataSource.forEach((data, index) => {
      if (data.select?.value === true) {
        this.checkboxValue.push(index);
      }
      this.checkboxOptions.push(index);
    });
    if (this.headers) {
      this.header = this.headers.map((h) => h.header);
    }
  }

  ngOnInit(): void {}

  onHeaderCheckboxChange($event: any, header: any, index: number) {
    this.onTableChange.emit({
      $event: this.dataSource[index][header]?.value == true ? false : true,
      header,
      index,
    });
  }

  menuOutput($event: any, option: any, index: number) {
    this.rowOption.emit({
      $event: $event,
      option,
      index,
    });
  }

  onChange($event: any, header: any, index?: number) {
    if (typeof $event != 'object' || $event instanceof Array)
      this.onTableChange.emit({ $event, header, index });
  }
}
