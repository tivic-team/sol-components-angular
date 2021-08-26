import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicButtonComponent } from './basic-button.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    BasicButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    BasicButtonComponent,
    MatButtonModule,
    MatIconModule
  ]
})
export class BasicButtonModule { }
