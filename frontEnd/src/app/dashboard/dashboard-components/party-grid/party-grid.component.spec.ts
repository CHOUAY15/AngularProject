import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyGridComponent } from './party-grid.component';

describe('PartyGridComponent', () => {
  let component: PartyGridComponent;
  let fixture: ComponentFixture<PartyGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
