import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolLibComponent } from './sol-lib.component';

describe('SolLibComponent', () => {
  let component: SolLibComponent;
  let fixture: ComponentFixture<SolLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
