import { Injectable } from "@angular/core";
import { TemplateService } from "./template.service";

@Injectable({
  providedIn: "root",
})
export class CodeService {
  // logic change, need to change to get all code and store it
  private code: any = {};
  private codeDescription: any = {};
  constructor(protected templateService: TemplateService) {}

  addCode(codeList: any[]) {
    codeList.forEach((cl) => {
      if (this.code[cl.code_type]) {
        this.code[cl.code_type].push({
          code: cl.code,
          description: cl.code_description,
        });
      } else {
        this.code[cl.code_type] = [
          { code: cl.code, description: cl.code_description },
        ];
      }
      this.codeDescription[cl.code] = cl.code_description;
    });
  }

  isDataRetrieve() {
    return Object.keys(this.code).length > 0;
  }

  getCodes(codeType: string) {
    return this.code[codeType].map((code: any) => {
      return code.code;
    });
  }

  getCodeDescription(code: string) {
    return this.codeDescription[code];
  }

  isCodeTypeExist(optionRule: string) {
    return this.code[optionRule] != undefined;
  }

  getAllCodes() {
    return this.templateService.get("code", { app: "Leave" }).then(
      (data: any) => {
        this.addCode(data);
      },
      (error) => {}
    );
  }
}
