import { Injectable } from '@angular/core';
import { TemplateService } from './template.service';

@Injectable({
  providedIn: 'root',
})
export class CodeService {
  // logic change, need to change to get all code and store it
  private code: any = {};
  constructor(protected templateService: TemplateService) {}

  addCode(codeList: any[]) {
    let cList = codeList.map((c) => c.code);
    let cT = codeList.map((c) => c.code_type)[0];
    this.code[cT] = cList;
  }

  getCodes(codeType: string) {
    return this.code[codeType];
  }

  isCodeTypeExist(optionRule: string) {
    return this.code[optionRule] != undefined;
  }

  getAllCodes() {
    return this.templateService.get('code');
  }
}
