import { HttpClient } from "@angular/common/http";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DomSanitizer } from "@angular/platform-browser";
import * as FileSaver from "file-saver";
import { BaseComponent } from "../base/base.component";
import { CodeService } from "../services/code.service";
import { FileService } from "../services/file.service";
import { TemplateService } from "../services/template.service";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"],
})
export class UploadComponent extends BaseComponent {
  @ViewChild("fileUpload") fileUpload: ElementRef;
  @Input() fileType: any[] = [];
  @Input() maxFileSize = 5;
  files: any = [];

  constructor(
    protected override snackBar: MatSnackBar,
    protected override cdr: ChangeDetectorRef,
    protected override codeService: CodeService,
    protected override templateService: TemplateService,
    protected sanitizer: DomSanitizer,
    protected http: HttpClient,
    protected fileService: FileService
  ) {
    super(snackBar, cdr, codeService, templateService);
  }

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (
      changes["value"] &&
      changes["value"].currentValue &&
      this.files.length == 0
    ) {
      this.files = [{ name: this.value }];
    }
  }

  onClick($event: any) {
    if (this.fileUpload) this.fileUpload.nativeElement.click();
  }

  onFileSelected(event: any) {
    let files = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;
    this.files = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      //if(!this.isFileSelected(file)){
      if (this.validate(file)) {
        //      if(this.isImage(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(files[i])
        );
        this.files.push(files[i]);
        // this.fileService.upload(this.files[i]);
        this.fileService.addFile(this.files[i]);
        this.change.emit(this.fileService.getFileName(this.files[i].name));
      } else {
        break;
      }
      //}
    }
  }

  validate(file: any) {
    if (parseInt((file.size / 1024 / 1024).toFixed(4)) > this.maxFileSize) {
      this.snackBar.open(
        "File size limited to "
          .concat(this.maxFileSize.toString())
          .concat("MB. Please reduce the file size!"),
        "OK"
      );
      return false;
    }
    if (this.fileType.length > 0 && !this.fileType.includes(file.type)) {
      this.snackBar.open(
        "File type is limited to ".concat(this.fileType.toString()),
        "OK"
      );
      return false;
    }
    if (file.name.length > 50) {
      this.snackBar.open(
        "File Name is limited to 50 characters only!. Please reduce the file name length!",
        "OK"
      );
    }
    return true;
  }

  removeFile(event: any, file: any) {
    let ix;
    if (this.files && -1 !== (ix = this.files.indexOf(file))) {
      this.files.splice(ix, 1);
      this.fileUpload.nativeElement.value = "";
    }
  }

  onDownload() {
    if (this.files[0] instanceof File) {
      FileSaver.saveAs(this.files[0], this.files[0].name);
    } else {
      this.fileService.download(this.value);
    }
  }
}
