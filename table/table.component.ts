import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
} from "@angular/core";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  @Input() headers: any[];
  @Input() dataSource: any[];
  @Output() onTableChange = new EventEmitter();
  @Output() rowOption = new EventEmitter();

  pageSizeOptions: any[] = [3, 5, 10];
  currentPageIndex: any = 0;
  currentPageSize: any = 3;
  header: string[];
  data: any[];

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
    this.onDataChange();
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
    if (typeof $event != "object" || $event instanceof Array)
      this.onTableChange.emit({ $event, header, index });
  }

  onPaginateChange($event: any) {
    this.currentPageIndex = $event.pageIndex;
    this.currentPageSize = $event.pageSize;
    this.onDataChange();
  }

  onDataChange() {
    this.data = [];
    if (this.dataSource)
      for (
        let i =
          this.currentPageIndex * this.currentPageSize > this.dataSource.length
            ? 0
            : this.currentPageIndex * this.currentPageSize;
        i <
          this.currentPageIndex * this.currentPageSize + this.currentPageSize &&
        i < this.dataSource.length;
        i++
      ) {
        this.data.push(JSON.parse(JSON.stringify(this.dataSource[i])));
      }
  }
}
