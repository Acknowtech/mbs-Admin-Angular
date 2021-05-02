import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferrlsComponent } from './referrls.component';

describe('ReferrlsComponent', () => {
  let component: ReferrlsComponent;
  let fixture: ComponentFixture<ReferrlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferrlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
