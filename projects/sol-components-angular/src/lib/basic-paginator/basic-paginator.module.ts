import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicPaginatorComponent } from './basic-paginator.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorPT } from '../util/MatPaginatorIntl';



@NgModule({
  declarations: [
    BasicPaginatorComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule
  ],
  exports: [
    BasicPaginatorComponent,
    MatPaginatorModule
  ],
  providers: [
    [{ provide: MatPaginatorIntl, useClass: MatPaginatorPT}]
  ]
})
export class BasicPaginatorModule { }
