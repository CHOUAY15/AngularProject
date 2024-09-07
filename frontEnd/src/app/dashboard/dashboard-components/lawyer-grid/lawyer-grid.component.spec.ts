import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerGridComponent } from './lawyer-grid.component';

describe('LawyerGridComponent', () => {
  let component: LawyerGridComponent;
  let fixture: ComponentFixture<LawyerGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawyerGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawyerGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
