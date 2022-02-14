import { Component, Input, OnInit, Output, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BasicPaginatorComponent } from '../basic-paginator/basic-paginator.component';
import { TableColumn } from '../models/TableColumn';

@Component({
  selector: 'sol-selection-table',
  templateUrl: './selection-table.component.html',
  styleUrls: ['./selection-table.component.scss']
})
export class SelectionTableComponent implements OnInit {

  @Input('columns') columns:TableColumn[];
  @Input('dataSource') dataSource:any[];
  @Output('rowClick') rowClick: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(BasicPaginatorComponent, {static: true}) basicPaginator: BasicPaginatorComponent;

  tableDataSource:MatTableDataSource<any>;
  displayedColumns: string[] = [];

  constructor(
    private detector: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.tableDataSource = new MatTableDataSource<any>(this.dataSource);
    this.displayedColumns = [];
    for (const column of this.columns) {
      this.displayedColumns.push(column.dataField);
    }
    this.detector.detectChanges();
  }
  
  ngAfterViewInit() {
    this.tableDataSource.paginator = this.basicPaginator.paginator;
    this.tableDataSource.sort = this.sort;
  }
  
  selectRow(row?:any){
    this.rowClick.emit(row);
  }

}
