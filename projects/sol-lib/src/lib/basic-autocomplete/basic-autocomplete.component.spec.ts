import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAutocompleteComponent } from './basic-autocomplete.component';

describe('BasicAutocompleteComponent', () => {
  let component: BasicAutocompleteComponent;
  let fixture: ComponentFixture<BasicAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
