import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitOptionDialogComponent } from './invit-option-dialog.component';

describe('InvitOptionDialogComponent', () => {
  let component: InvitOptionDialogComponent;
  let fixture: ComponentFixture<InvitOptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitOptionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvitOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
