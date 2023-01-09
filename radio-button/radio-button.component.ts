import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SimpleChange,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../base/base.component';
import { CodeService } from '../services/code.service';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent extends BaseComponent {
  @Input() layout = 'vertical';
  constructor(
    protected override snackBar: MatSnackBar,
    protected override cdr: ChangeDetectorRef,
    protected override codeService: CodeService
  ) {
    super(snackBar, cdr, codeService);
  }

  override ngOnInit(): void {}
}
