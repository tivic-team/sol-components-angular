import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionTableComponent } from './selection-table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BasicPaginatorModule } from '../basic-paginator/basic-paginator.module';



@NgModule({
  declarations: [
    SelectionTableComponent
  ],
  imports: [
    CommonModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    BasicPaginatorModule
  ],
  exports: [
    CommonModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    SelectionTableComponent,
    BasicPaginatorModule
  ]
})
export class SelectionTableModule { }
