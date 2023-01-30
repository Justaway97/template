import { DatePipe } from "@angular/common";
import {
  ChangeDetectorRef,
  Component,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BaseComponent } from "../base/base.component";
import { CodeService } from "../services/code.service";
import { TemplateService } from "../services/template.service";

@Component({
  selector: "app-date-picker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.scss"],
})
export class DatePickerComponent extends BaseComponent {
  dateControl: FormControl;

  constructor(
    private datePipe: DatePipe,
    protected override snackBar: MatSnackBar,
    protected override cdr: ChangeDetectorRef,
    protected override codeService: CodeService,
    protected override templateService: TemplateService
  ) {
    super(snackBar, cdr, codeService, templateService);
    if (this.placeholder === "") {
      this.placeholder = "Choose a date";
    }
  }

  // any value change need to reflect in html can use ngOnChanges to detect the changes
  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if (typeof this.value == "number") {
      this.value = this.datePipe.transform(new Date(+this.value), "yyyy-MM-dd");
    } else if (typeof this.value == "string") {
      let newDate: any = new Date(this.value.split("T")[0]);
      this.value = !isNaN(newDate?.getTime())
        ? this.datePipe.transform(newDate, "yyyy-MM-dd")
        : null;
    }
  }

  override ngOnInit(): void {}

  override formatAndReturnValue() {
    this.value = new Date(this.value).toISOString();
    super.formatAndReturnValue();
  }
}
