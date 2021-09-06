import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolComponentsAngularComponent } from './sol-components-angular.component';

describe('SolComponentsAngularComponent', () => {
  let component: SolComponentsAngularComponent;
  let fixture: ComponentFixture<SolComponentsAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolComponentsAngularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolComponentsAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
