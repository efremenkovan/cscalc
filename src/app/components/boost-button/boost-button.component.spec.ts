import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoostButtonComponent } from './boost-button.component';

describe('BoostButtonComponent', () => {
  let component: BoostButtonComponent;
  let fixture: ComponentFixture<BoostButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoostButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoostButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
