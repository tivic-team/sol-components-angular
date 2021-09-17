import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BasicPaginatorComponent } from '../basic-paginator/basic-paginator.component';
import { TableColumn } from '../models/TableColumn';

@Component({
  selector: 'sol-multiple-table',
  templateUrl: './multiple-table.component.html',
  styleUrls: ['./multiple-table.component.scss']
})
export class MultipleTableComponent implements OnInit {

  @Input('columns') columns:TableColumn[];
  @Input('dataSource') dataSource:any[];
  @ViewChild(BasicPaginatorComponent, {static: true}) basicPaginator: BasicPaginatorComponent;
  @ViewChild(MatSort) sort: MatSort;
  

  tableDataSource:MatTableDataSource<any>;
  displayedColumns: string[] = [];
  selection = new SelectionModel<any>(true, []);

  get selected():any {
    return this.selection.selected;
  }

  constructor() { }

  ngOnInit(): void {
    this.tableDataSource = new MatTableDataSource<any>(this.dataSource);
    this.displayedColumns.push('select');
    for (const column of this.columns) {
      this.displayedColumns.push(column.dataField);
    }
  }
  
  ngAfterViewInit() {
    this.tableDataSource.paginator = this.basicPaginator.paginator;
    this.tableDataSource.sort = this.sort;
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableDataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.tableDataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  selectRow(row?:any){
    this.selection.toggle(row);
  }

}
