import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../base/base.component';
import { CodeService } from '../services/code.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent extends BaseComponent {
  @Input() tooltip: any;
  @Input() tooltipPosition: any;
  @Input() color: string = 'primary';
  @Input() isIcon: boolean = false;
  constructor(
    protected override snackBar: MatSnackBar,
    protected override cdr: ChangeDetectorRef,
    protected override codeService: CodeService
  ) {
    super(snackBar, cdr, codeService);
  }

  override ngOnInit(): void {}
}
