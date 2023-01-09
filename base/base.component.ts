import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CodeService } from '../services/code.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements ControlValueAccessor {
  @Output() change = new EventEmitter();
  @Input() placeholder: string = '';
  @Input() disabled = false;
  @Input() label: string;
  @Input() options: any[];
  @Input() optionRule: string;
  @Input() authorize: string;
  optionLoading = false;

  @Input() value: any;
  constructor(
    protected snackBar: MatSnackBar,
    protected cdr: ChangeDetectorRef,
    protected codeService: CodeService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.optionRule && !this.options && !this.optionLoading) {
      this.optionLoading = true;
      if (this.codeService.isCodeTypeExist(this.optionRule)) {
        this.options = this.codeService.getCodes(this.optionRule);
      } else {
        this.codeService.getAllCodes().then(
          (data: any) => {
            this.options = data.data.map((d: any) => d.code);
            this.codeService.addCode(data.data);
            this.optionLoading = false;
            this.ngOnChanges(changes);
          },
          (error: any) => {
            this.optionLoading = false;
          }
        );
      }
    }
  }

  arrayValueChanged(value: any) {
    if (!this.value.includes(value)) {
      this.value.push(value);
    } else if (this.value.includes(value)) {
      this.value = this.value.filter((v: any) => v != value);
    }
    this.formatAndReturnValue();
  }

  valueChanged(...value: any) {
    if (value instanceof Array) {
      value = value[0];
    }
    this.onChange(value);
    this.onTouched();
    this.value = value;
    this.formatAndReturnValue();
  }

  formatAndReturnValue() {
    this.change.emit(this.value);
  }

  public onChange = (_: any) => {};
  public onTouched = () => {};

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(value: any): void {
    this.value = value;
  }
}
