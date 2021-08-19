import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'sol-basic-checkbox',
  templateUrl: './basic-checkbox.component.html',
  styleUrls: ['./basic-checkbox.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BasicCheckboxComponent),
    multi: true
  }]
})
export class BasicCheckboxComponent implements OnInit, ControlValueAccessor, OnChanges {

  private _value: any;

  @Input() label: string;

  @Output() changes: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.label = '';
   }

  ngOnInit(): void {
    
  }

  onChange(e:MatCheckboxChange){
    this._value = e;
    this.propagateChange(+e.checked);
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
