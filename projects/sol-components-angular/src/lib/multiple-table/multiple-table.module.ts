import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipleTableComponent } from './multiple-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BasicPaginatorModule } from '../basic-paginator/basic-paginator.module';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    MultipleTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    BasicPaginatorModule
  ],
  exports: [
    MultipleTableComponent,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    BasicPaginatorModule
  ]
})
export class MultipleTableModule { }
