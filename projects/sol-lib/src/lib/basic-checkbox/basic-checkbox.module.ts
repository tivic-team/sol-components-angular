import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicCheckboxComponent } from './basic-checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    BasicCheckboxComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],
  exports: [
    BasicCheckboxComponent,
    MatCheckboxModule,
    MatFormFieldModule
  ]
})
export class BasicCheckboxModule { }
