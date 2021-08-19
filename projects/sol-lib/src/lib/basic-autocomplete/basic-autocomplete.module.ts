import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicAutocompleteComponent } from './basic-autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    BasicAutocompleteComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule
  ],
  exports: [
    BasicAutocompleteComponent,
    MatAutocompleteModule,
    MatFormFieldModule
  ]
})
export class BasicAutocompleteModule { }
