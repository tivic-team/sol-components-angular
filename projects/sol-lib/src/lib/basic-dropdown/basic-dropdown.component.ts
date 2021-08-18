import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { DataField } from '../models/DataField';

@Component({
  selector: 'sol-basic-dropdown',
  templateUrl: './basic-dropdown.component.html',
  styleUrls: ['./basic-dropdown.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BasicDropdownComponent),
    multi: true
  }]
})
export class BasicDropdownComponent implements OnInit, ControlValueAccessor, OnChanges {

  private _value: any;

  @Input() title: string;
  @Input() selected: any;
  @Input() dataList:DataField;

  @Output() changes: EventEmitter<any> = new EventEmitter<any>();

  constructor() { 
    this.title = '';
    this.dataList = new DataField([]);
  }
  
  ngOnInit(): void {
    
  }

  onChange(e:MatSelectChange){
    this._value = e.value;
    this.propagateChange(e);
    this.changes.emit(e);
  }

  ngOnChanges() {
    
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  propagateChange = (_: any) => { }

  writeValue(value: any) {
    this._value = value;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {

  }

}
