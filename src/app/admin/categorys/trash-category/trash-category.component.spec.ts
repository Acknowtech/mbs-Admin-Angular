import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashCategoryComponent } from './trash-category.component';

describe('TrashCategoryComponent', () => {
  let component: TrashCategoryComponent;
  let fixture: ComponentFixture<TrashCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
