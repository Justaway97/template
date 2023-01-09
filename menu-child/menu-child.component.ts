import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-menu-child',
  templateUrl: './menu-child.component.html',
  styleUrls: ['./menu-child.component.scss'],
})
export class MenuChildComponent implements OnInit {
  @Input() options: any[];
  @ViewChild('childMenu') public childMenu: any;
  @Output() public click = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClick($event: any) {
    this.click.emit($event);
  }
}
