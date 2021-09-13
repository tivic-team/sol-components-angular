import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { BasicDropdownModule } from './basic-dropdown/basic-dropdown.module';
import { BasicCheckboxModule } from './basic-checkbox/basic-checkbox.module';
import { BasicAutocompleteModule } from './basic-autocomplete/basic-autocomplete.module';
import { BasicButtonModule } from './basic-button/basic-button.module';
import { BasicTextModule } from './basic-text/basic-text.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false,
};



@NgModule({
  declarations: [//TODO Remover components e importar modulos
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

    BasicDropdownModule,
    BasicCheckboxModule,
    BasicAutocompleteModule,
    BasicButtonModule,
    BasicTextModule,

    NgxMaskModule.forRoot(maskConfig)
  ],
  exports: [
    BasicDropdownModule,
    BasicCheckboxModule,
    BasicAutocompleteModule,
    BasicButtonModule,
    BasicTextModule
  ]
})
export class SolComponentsAngularModule { }
