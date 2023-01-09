import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CodeService } from '../services/code.service';

@Component({
  selector: 'app-multi-auto-complete',
  templateUrl: './multi-auto-complete.component.html',
  styleUrls: ['./multi-auto-complete.component.scss'],
})
export class MultiAutoCompleteComponent extends BaseComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  myFormControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  @ViewChild('optionInput') optionInput: ElementRef<HTMLInputElement>;

  constructor(
    protected override snackBar: MatSnackBar,
    protected override cdr: ChangeDetectorRef,
    protected override codeService: CodeService
  ) {
    super(snackBar, cdr, codeService);
  }

  override ngOnInit(): void {
    if (this.value) {
      this.myFormControl = new FormControl(this.value);
    }
  }

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    setTimeout(() => {
      if (this.options) {
        this.filteredOptions = this.myFormControl.valueChanges.pipe(
          startWith(''),
          map((value) => {
            if (typeof value === 'string') {
              return this.options.filter((option) => {
                return option.toLowerCase().includes(value.toLowerCase());
              });
            }
            return [];
          })
        );
      }
    });
  }

  remove(option: string): void {
    const index = this.value.indexOf(option);

    if (index >= 0) {
      this.value.splice(index, 1);
    }
    this.formatAndReturnValue();
  }

  override valueChanged(event: any): void {
    if (!this.value.includes(event.option.viewValue)) {
      this.value.push(event.option.viewValue);
    }
    this.optionInput.nativeElement.value = '';
    this.myFormControl.setValue('');
    this.formatAndReturnValue();
  }
}
