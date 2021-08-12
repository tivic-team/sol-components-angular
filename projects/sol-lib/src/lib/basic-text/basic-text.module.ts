import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicTextComponent } from './basic-text.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    BasicTextComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    NgxMaskModule.forRoot(),
    NgxMaskModule.forChild()

  ],
  exports: [
    BasicTextComponent,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class BasicTextModule { }
