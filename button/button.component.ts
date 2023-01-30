import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BaseComponent } from "../base/base.component";
import { CodeService } from "../services/code.service";
import { TemplateService } from "../services/template.service";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent extends BaseComponent {
  @Input() tooltip: any;
  @Input() tooltipPosition: any = "below";
  @Input() color: string = "primary";
  @Input() isIcon: boolean = false;
  @Input() type = "button";

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
