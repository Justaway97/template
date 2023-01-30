import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, startWith, map } from "rxjs";
import { BaseComponent } from "../base/base.component";
import { CodeService } from "../services/code.service";
import { TemplateService } from "../services/template.service";

@Component({
  selector: "app-auto-complete",
  templateUrl: "./auto-complete.component.html",
  styleUrls: ["./auto-complete.component.scss"],
})
export class AutoCompleteComponent extends BaseComponent {
  inputControl = new FormControl("");
  filterOptions: Observable<string[]>;

  constructor(
    protected override snackBar: MatSnackBar,
    protected override cdr: ChangeDetectorRef,
    protected override codeService: CodeService,
    protected override templateService: TemplateService
  ) {
    super(snackBar, cdr, codeService, templateService);
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if (this.value !== undefined && typeof this.value == "string") {
      this.inputControl.patchValue(this.value);
    } else if (this.value instanceof Event) {
      this.valueChanged((this.value as any).option.value);
    }
    setTimeout(() => {
      if (this.options) {
        this.filterOptions = this.inputControl.valueChanges.pipe(
          startWith(this.value ? this.value : ""),
          map((value) => {
            const v = value?.toString().toLowerCase() as string;
            return this.options.filter((option) => {
              return option.toLowerCase().includes(v);
            });
          })
        );
      }
    }, 0);
  }
}
