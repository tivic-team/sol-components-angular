import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DataField } from '../models/DataField';

@Component({
  selector: 'sol-basic-autocomplete',
  templateUrl: './basic-autocomplete.component.html',
  styleUrls: ['./basic-autocomplete.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BasicAutocompleteComponent),
    multi: true
  }]
})
export class BasicAutocompleteComponent implements OnInit, ControlValueAccessor, OnChanges {

  private _value: any;

  @Input() title: string;
  @Input() dataList: DataField;
  @Input() filteredOptions: Array<any>;

  @Output() changes: EventEmitter<any> = new EventEmitter<any>();

  constructor() { 
    this.title = '';
    this.dataList = new DataField([]);
    this.filteredOptions = [];
  }


  ngOnInit(): void {
    
  }

  onChange(e:Event, value:any){
    this._value = value;
    this.propagateChange(value);
    this.changes.emit(value);
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
