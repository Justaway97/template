import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() color = 'primary';
  @Input() item: any;
  @Output() selectedOption = new EventEmitter();

  optionSelected($event: any) {
    this.selectedOption.emit($event);
  }

  constructor() {}

  ngOnInit(): void {}
}
