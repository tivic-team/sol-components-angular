import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sol-basic-button',
  templateUrl: './basic-button.component.html',
  styleUrls: ['./basic-button.component.css']
})
export class BasicButtonComponent implements OnInit, OnChanges {

  @Input() btn_color: 'none' | 'primary' | 'accent' | 'warn';
  @Input() title: string;
  @Input() btn_type: 'basic' | 'raised';
  @Input() icon: string;
  @Input() iconPosition: 'start' | 'end';

  @Output() event: EventEmitter<any> = new EventEmitter<any>();
  private _value: any;

  constructor() { 
    this.btn_color = 'none';
    this.title = '';
    this.icon = '';
    this.iconPosition = 'start';
    this.btn_type = 'basic';
  }

  ngOnInit(): void {
    
  }

  onChange(e:Event, value:any){
    this._value = value;
    this.event.emit(value);
  }

  ngOnChanges() {
    
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  writeValue(value: any) {
    this._value = value;
  }

}
