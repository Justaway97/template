import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { TemplateService } from "../services/template.service";

@Component({
  selector: "app-menu-child",
  templateUrl: "./menu-child.component.html",
  styleUrls: ["./menu-child.component.scss"],
})
export class MenuChildComponent implements OnInit {
  @Input() options: any[];
  @Input() userRole: any;
  @ViewChild("childMenu") public childMenu: any;
  @Output() public click = new EventEmitter();
  constructor(protected templateService: TemplateService) {
    setTimeout(() => {
      this.templateService.onUserRoleChange.subscribe(
        (userRole) => (this.userRole = userRole)
      );
    }, 0);
  }

  ngOnInit(): void {}

  onClick($event: any) {
    this.click.emit($event);
  }
}
