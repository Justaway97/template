import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../base/base.component';
import { CodeService } from '../services/code.service';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
})
export class ButtonToggleComponent extends BaseComponent {
  constructor(
    protected override snackBar: MatSnackBar,
    protected override cdr: ChangeDetectorRef,
    protected override codeService: CodeService
  ) {
    super(snackBar, cdr, codeService);
  }

  override ngOnInit(): void {}
}
