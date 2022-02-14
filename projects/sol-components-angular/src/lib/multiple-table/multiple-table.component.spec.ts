import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleTableComponent } from './multiple-table.component';

describe('MultipleTableComponent', () => {
  let component: MultipleTableComponent;
  let fixture: ComponentFixture<MultipleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
