import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicTableComponent } from './basic-table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    BasicTableComponent
  ],
  imports: [
    CommonModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  exports: [
    BasicTableComponent,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class BasicTableModule { }
