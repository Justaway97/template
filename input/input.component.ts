import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BaseComponent } from "../base/base.component";
import { CodeService } from "../services/code.service";
import { TemplateService } from "../services/template.service";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent extends BaseComponent {
  inputControl: any = new FormControl("");
  @Output() inputChange = new EventEmitter();
  @Input() type = "text";

  constructor(
    protected override snackBar: MatSnackBar,
    protected override cdr: ChangeDetectorRef,
    protected override codeService: CodeService,
    protected override templateService: TemplateService
  ) {
    super(snackBar, cdr, codeService, templateService);
  }

  override ngOnInit(): void {}

  onBlur() {
    this.value = this.inputControl.value;
    this.inputChange.emit(this.value);
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if (this.value || this.value == "") {
      this.inputControl = new FormControl(this.value);
    }
  }
}
