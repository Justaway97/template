import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TemplateService } from "../services/template.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  @Input() color = "primary";
  @Input() item: any;
  @Input() userRole: any;
  @Output() selectedOption = new EventEmitter();

  optionSelected($event: any) {
    this.selectedOption.emit($event);
  }

  constructor(protected templateService: TemplateService) {
    setTimeout(() => {
      this.templateService.onUserRoleChange.subscribe(
        (userRole) => (this.userRole = userRole)
      );
    }, 0);
  }

  ngOnInit(): void {}
}
