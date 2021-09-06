import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { DataField } from '../models/DataField';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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
  @Input() placeholder: string;
  @Input() dataList: DataField;
  @Input() formControl: FormControl;
  filterControl: FormControl;

  @Output() changes: EventEmitter<any> = new EventEmitter<any>();
  filteredOptions: Array<{cd: string, label: string}>;

  constructor() { 
    this.title = '';
    this.placeholder = '';
    this.dataList = new DataField([]);
    this.formControl = new FormControl();
    this.filterControl = new FormControl('');
    this.filteredOptions = [];
  }


  ngOnInit() {
    this.filterControl.valueChanges.subscribe(value => {
      this.filteredOptions = this._filter(value);
    })
  }

  onChange(e:MatAutocompleteSelectedEvent){
    this._value = e.option.value;
    this.propagateChange(this._value.cd);
    this.changes.emit(this._value.cd);
  }

  ngOnChanges() {
    
  }

  private _filter(value: string):  Array<{cd: string, label: string}> {
    if (value.length >= 3) {
      const filterValue = value.toLowerCase();
      return this.dataList._dataList.filter(option => option.label.toLowerCase().includes(filterValue));
    }
    
    return [];
  }

  displayFn(tpStatus: any) {
    return tpStatus.label;
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
