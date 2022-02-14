import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicTableComponent } from './basic-table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BasicPaginatorModule } from '../basic-paginator/basic-paginator.module';



@NgModule({
  declarations: [
    BasicTableComponent
  ],
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    BasicPaginatorModule,
  ],
  exports: [
    BasicTableComponent,
    MatSortModule,
    MatTableModule,
    BasicPaginatorModule
  ]
})
export class BasicTableModule { }
