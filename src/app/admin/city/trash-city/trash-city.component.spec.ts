import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashCityComponent } from './trash-city.component';

describe('TrashCityComponent', () => {
  let component: TrashCityComponent;
  let fixture: ComponentFixture<TrashCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
