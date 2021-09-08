import { NgModule } from '@angular/core';
import { BasicTextComponent } from './basic-text/basic-text.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BasicAutocompleteComponent } from './basic-autocomplete/basic-autocomplete.component';
import { BasicCheckboxComponent } from './basic-checkbox/basic-checkbox.component';
import { BasicDropdownComponent } from './basic-dropdown/basic-dropdown.component';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { BasicButtonComponent } from './basic-button/basic-button.component';



@NgModule({
  declarations: [
    BasicTextComponent,
    BasicAutocompleteComponent,
    BasicCheckboxComponent,
    BasicDropdownComponent,
    BasicButtonComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    
  ],
  exports: [
    BasicTextComponent,
    BasicAutocompleteComponent,
    BasicCheckboxComponent,
    BasicDropdownComponent,
    BasicButtonComponent,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ]
})
export class SolComponentsAngularModule { }
