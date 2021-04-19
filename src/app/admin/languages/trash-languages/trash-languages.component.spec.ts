import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashLanguagesComponent } from './trash-languages.component';

describe('TrashLanguagesComponent', () => {
  let component: TrashLanguagesComponent;
  let fixture: ComponentFixture<TrashLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashLanguagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
