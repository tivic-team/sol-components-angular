import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicTextComponent } from './basic-text.component';



@NgModule({
  declarations: [
    BasicTextComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BasicTextComponent
  ]
})
export class BasicTextModule { }
