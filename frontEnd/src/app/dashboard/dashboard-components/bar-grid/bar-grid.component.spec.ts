import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarGridComponent } from './bar-grid.component';

describe('BarGridComponent', () => {
  let component: BarGridComponent;
  let fixture: ComponentFixture<BarGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
