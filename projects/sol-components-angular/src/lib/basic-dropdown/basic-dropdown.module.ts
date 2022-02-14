import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDropdownComponent } from './basic-dropdown.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    BasicDropdownComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  exports: [
    BasicDropdownComponent,
    MatSelectModule
  ]
})
export class BasicDropdownModule { }
