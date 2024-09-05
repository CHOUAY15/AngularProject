import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeGridComponent } from './judge-grid.component';

describe('JudgeGridComponent', () => {
  let component: JudgeGridComponent;
  let fixture: ComponentFixture<JudgeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JudgeGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JudgeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
