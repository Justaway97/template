import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BaseComponent } from "../base/base.component";
import { CodeService } from "../services/code.service";
import { TemplateService } from "../services/template.service";

@Component({
  selector: "app-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
})
export class CheckboxComponent extends BaseComponent {
  @Input() layout: string = "vertical";
  @Input() displayOption = true;

  constructor(
    protected override snackBar: MatSnackBar,
    protected override cdr: ChangeDetectorRef,
    protected override codeService: CodeService,
    protected override templateService: TemplateService
  ) {
    super(snackBar, cdr, codeService, templateService);
  }
  override ngOnInit(): void {}
}
