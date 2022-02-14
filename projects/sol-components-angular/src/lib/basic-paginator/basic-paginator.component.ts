import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'sol-basic-paginator',
  templateUrl: './basic-paginator.component.html',
  styleUrls: ['./basic-paginator.component.css']
})
export class BasicPaginatorComponent implements OnInit {

  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor() {}
  ngOnInit(): void {
  }

}
