import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../base/base.component';
import { CodeService } from '../services/code.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent extends BaseComponent {
  @Input() icon: any;
  loading = true;

  constructor(
    protected override snackBar: MatSnackBar,
    protected override cdr: ChangeDetectorRef,
    protected override codeService: CodeService
  ) {
    super(snackBar, cdr, codeService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges(); // to solve ng0100 error
    }, 0);
  }
}
