import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDropdownComponent } from './basic-dropdown.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    BasicDropdownComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule
    
  ],
  exports: [
    BasicDropdownComponent,
    MatSelectModule
  ]
})
export class BasicDropdownModule { }
