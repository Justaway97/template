import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss'],
})
export class FormButtonComponent implements OnInit {
  @Input() submitLabel: any;
  @Output() submit = new EventEmitter();
  @Output() reset = new EventEmitter();
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';
  @Input() position: 'left' | 'right' = 'left';

  constructor() {}

  ngOnInit(): void {}

  buttonClick(action: string) {
    if (action == 'submit') {
      this.submit.emit();
    }
    if (action == 'reset') {
      this.reset.emit();
    }
  }

  getClass() {
    let c = this.layout == 'horizontal' ? 'horizontal' : 'vertical';
    c = c.concat(' ').concat(this.position == 'left' ? 'left' : 'right');
    return c;
  }
}
