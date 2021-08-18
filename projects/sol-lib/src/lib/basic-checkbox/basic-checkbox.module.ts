import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicCheckboxComponent } from './basic-checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox'



@NgModule({
  declarations: [
    BasicCheckboxComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule
  ],
  exports: [
    BasicCheckboxComponent,
    MatCheckboxModule
  ]
})
export class BasicCheckboxModule { }
