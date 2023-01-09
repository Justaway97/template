import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.scss'],
})
export class DialogHeaderComponent implements OnInit {
  @Output() onDialogClose = new EventEmitter();
  @Input() title: any;

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.onDialogClose.emit();
  }
}
