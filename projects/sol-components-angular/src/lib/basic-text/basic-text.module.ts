import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BasicTextComponent } from './basic-text.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    BasicTextComponent
  ],
  entryComponents: [
    BasicTextComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [
    MatSelectModule,
    BasicTextComponent
  ]
})
export class BasicTextModule { }
