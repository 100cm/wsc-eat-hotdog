import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointBonusComponent } from './point-bonus.component';

describe('PointBonusComponent', () => {
  let component: PointBonusComponent;
  let fixture: ComponentFixture<PointBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
