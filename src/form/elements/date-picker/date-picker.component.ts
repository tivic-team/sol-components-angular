import { DateAdapter } from '@angular/material/core';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerCustomComponent implements OnInit {

  @Input() dtValue: any;
  @Output() response = new EventEmitter<any>();

  dateValue: string;
  timeValue: string;
  date: any;

  constructor(private adapter: DateAdapter<any>) { }

  ngOnInit(): void {
    this.adapter.setLocale('pt-br');

    this.responseSplit();

    const dateConv = moment(this.dateValue, 'DD-MM-YYYY').format('yyyy/MM/DD');
    this.date = new FormControl(new Date(dateConv));
  }

  responseSplit() {
    this.dateValue = this.dtValue.substr(0, 10);
    this.timeValue = this.dtValue.substr(11, 8);
  }

  updateDate() {
    this.date.value = moment(this.date.value).format('DD/MM/yyyy');
    this.dtValue = this.convertDate() + ' ' + this.timeValue;
    this.emitDT();
  }

  updateTime() {
    this.dtValue = this.convertDate() + ' ' + this.timeValue;
    this.emitDT();
  }

  emitDT() {
    this.dtValue = this.convertDate() + ' ' + this.timeValue;
    this.response.emit(this.dtValue);
  }

  convertDate() {
    return moment(this.date.value, 'DD/MM/yyyy').format('DD-MM-yyyy');
  }
}
