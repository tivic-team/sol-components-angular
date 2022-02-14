import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import getMaskFormat from '../util/maskFormatter';

@Component({
  selector: 'sol-basic-text',
  templateUrl: './basic-text.component.html',
  styleUrls: ['./basic-text.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BasicTextComponent),
    multi: true
  }]
})
export class BasicTextComponent implements OnInit, ControlValueAccessor, OnChanges {

  private _value: any;

  @Input() title: string;
  @Input() icon: string;
  @Input() iconPosition: 'start' | 'end';
  @Input() maskFormat: string;
  @Input() isEmailInput: boolean;


  @Output() changes: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.title = '';
    this.icon = '';
    this.iconPosition = 'end';
    this.maskFormat = '';
    this.isEmailInput = false;
  }

  ngOnInit(): void {

    this.maskFormat = this.isEmailInput ? getMaskFormat('') : getMaskFormat(this.maskFormat);
    
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
