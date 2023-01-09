import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form: FormGroup; // form
  originalFormData: any; // store the state of the data for reset purpose
  formData: any; // form data that use to form a form
  data: any = {}; // final data that need to submit for http call

  constructor(protected fb: FormBuilder, protected cdr: ChangeDetectorRef) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.initFind();
  }

  initFind() {
    this.postFind();
  }

  postFind() {
    this.initForm();
  }

  initForm() {
    this.addControlToForm(this.formData, this.form);
  }

  addControlToForm(data: any, form: any) {
    let dataKeys = Object.keys(data);
    for (const key of dataKeys) {
      if (
        data[key] instanceof Array &&
        data[key][0] &&
        typeof data[key][0] == 'object'
      ) {
        form.addControl(key, this.fb.array([]));
        for (let i = 0; i < data[key].length; i++) {
          (form.get(key) as FormArray).push(this.fb.group({}));
          this.addControlToForm(data[key][i], form.get(key).at(i));
        }
      } else {
        form.addControl(key, new FormControl(data[key]));
      }
    }
  }

  resetForm() {
    this.resetFormValue(this.originalFormData, this.form);
    this.cdr.detectChanges();
  }

  resetFormValue(data: any, form: any) {
    let dataKeys = Object.keys(data);
    for (const key of dataKeys) {
      if (
        data[key] instanceof Array &&
        data[key][0] &&
        typeof data[key][0] == 'object'
      ) {
        for (let i = 0; i < data[key].length; i++) {
          this.resetFormValue(data[key][i], form.get(key).at(i));
        }
      } else {
        form.get(key)?.patchValue(data[key]);
      }
    }
  }

  onChange(value: any, formControlName: string) {
    //data.0.xyz is example
    this.form.get(formControlName)?.patchValue(value);
  }

  generateFormValue(data: any) {
    this.data = data;
    this.generate(data, this.formData);
    this.originalFormData = JSON.parse(JSON.stringify(this.formData));
  }

  generate(data: any, formData: any) {
    let dataKeys = Object.keys(formData);
    for (const key of dataKeys) {
      if (Array.isArray(formData[key])) {
        if (
          formData[key].length == 0 &&
          data[this.formatKeyWithUnderScore(key)]
        ) {
          formData[key] = this.splitCommaToArray(
            data[this.formatKeyWithUnderScore(key)]
          );
        } else if (formData[key].length > 0) {
          for (const index in data[key]) {
            this.generate(data[key][index], formData[key][index]);
          }
        }
      } else {
        formData[key] = data[this.formatKeyWithUnderScore(key)];
      }
    }
  }

  splitCommaToArray(value: any) {
    return value.split(',') == '' ? [] : value.split(',');
  }

  formatKeyWithUnderScore(key: any) {
    let keys: any = key.split(/(?=[A-Z])/);
    let formattedKey = '';
    keys.forEach((k: any, index: number) => {
      if (index > 0) {
        k = k.charAt(0).toLowerCase() + k.slice(1);
        if (index != keys.length) {
          formattedKey = formattedKey.concat('_');
        }
      }
      formattedKey = formattedKey.concat(k);
    });
    return formattedKey;
  }

  formatKeyWithCapital(key: any) {
    let keys: any = key.split('_');
    let formattedKey = '';
    keys.forEach((k: any, index: number) => {
      if (index > 0) {
        k = k.charAt(0).toUpperCase() + k.slice(1);
      }
      formattedKey = formattedKey.concat(k);
    });
    return formattedKey;
  }

  onFormSubmit() {
    this.formatFormValue(this.data, this.form.value, this.originalFormData);
  }

  formatFormValue(data: any, form: any, originalFormData: any) {
    let keys = Object.keys(form);
    for (const key of keys) {
      if (form[key] instanceof Array && form[key][0]) {
        if (typeof form[key][0] == 'string')
          data[this.formatKeyWithUnderScore(key)] = form[key].toString();
        else {
          for (
            let i = 0;
            i < data[this.formatKeyWithUnderScore(key)].length;
            i++
          ) {
            this.formatFormValue(
              data[this.formatKeyWithUnderScore(key)][i],
              form[key][i],
              originalFormData[key][0]
            );
          }
        }
      } else {
        data[this.formatKeyWithUnderScore(key)] =
          form[key] && form[key] !== originalFormData[key]
            ? form[key].toString()
            : null;
      }
    }
  }

  clearAllData() {
    this.form = new FormGroup({});
    this.originalFormData = null;
    this.formData = null;
    this.data = {};
  }
}
