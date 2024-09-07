import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtGridComponent } from './court-grid.component';

describe('CourtGridComponent', () => {
  let component: CourtGridComponent;
  let fixture: ComponentFixture<CourtGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourtGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
