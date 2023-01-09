import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { BaseComponent } from './base/base.component';
import { ButtonComponent } from './button/button.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { FormComponent } from './form/form.component';
import { FormButtonComponent } from './form-button/form-button.component';
import { InputComponent } from './input/input.component';
import { MenuComponent } from './menu/menu.component';
import { MenuChildComponent } from './menu-child/menu-child.component';
import { MultiAutoCompleteComponent } from './multi-auto-complete/multi-auto-complete.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { TableComponent } from './table/table.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';

//angular material
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AutoCompleteComponent,
    BaseComponent,
    ButtonComponent,
    ButtonToggleComponent,
    CheckboxComponent,
    DatePickerComponent,
    DialogHeaderComponent,
    FormComponent,
    FormButtonComponent,
    InputComponent,
    MenuComponent,
    MenuChildComponent,
    MultiAutoCompleteComponent,
    RadioButtonComponent,
    TableComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatChipsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatMenuModule,
    MatNativeDateModule,
    AppRoutingModule,
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
  ],
  bootstrap: [],
})
export class TemplateModule {}
