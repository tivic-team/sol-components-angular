import { NgModule } from '@angular/core';
import { SolLibComponent } from './sol-lib.component';
import { MatInputModule } from '@angular/material/input';
import { BasicTextModule } from './basic-text/basic-text.module';
import { MatIconModule } from '@angular/material/icon';
import { BasicDropdownModule } from './basic-dropdown/basic-dropdown.module';
import { BasicCheckboxModule } from './basic-checkbox/basic-checkbox.module';
import { BasicAutocompleteModule } from './basic-autocomplete/basic-autocomplete.module';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    SolLibComponent
  ],
  imports: [
    MatInputModule,
    BasicAutocompleteModule,
    BasicCheckboxModule,
    BasicDropdownModule,
    BasicTextModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [
    SolLibComponent,
    BasicAutocompleteModule,
    BasicCheckboxModule,
    BasicDropdownModule,
    BasicTextModule,
    MatFormFieldModule
  ]
})

export class SolLibModule { }
