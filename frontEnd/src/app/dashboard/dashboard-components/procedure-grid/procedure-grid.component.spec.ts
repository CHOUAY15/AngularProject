import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureGridComponent } from './procedure-grid.component';

describe('ProcedureGridComponent', () => {
  let component: ProcedureGridComponent;
  let fixture: ComponentFixture<ProcedureGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcedureGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcedureGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
