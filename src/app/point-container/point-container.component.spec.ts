import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointContainerComponent } from './point-container.component';

describe('PointContainerComponent', () => {
  let component: PointContainerComponent;
  let fixture: ComponentFixture<PointContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
