import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BasicPaginatorComponent } from '../basic-paginator/basic-paginator.component';
import { TableColumn } from '../models/TableColumn';

@Component({
  selector: 'sol-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss']
})
export class BasicTableComponent implements OnInit {

  @Input('columns') columns:TableColumn[];
  @Input('dataSource') dataSource:any[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(BasicPaginatorComponent, {static: true}) basicPaginator: BasicPaginatorComponent;

  tableDataSource:MatTableDataSource<any>;
  displayedColumns: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.tableDataSource = new MatTableDataSource<any>(this.dataSource);
    for (const column of this.columns) {
      this.displayedColumns.push(column.dataField);
    }
  }
  
  ngAfterViewInit() {
    this.tableDataSource.paginator = this.basicPaginator.paginator;
    this.tableDataSource.sort = this.sort;
  }
  
}
