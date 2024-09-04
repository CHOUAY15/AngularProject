import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewOptionDialogComponent } from './add-new-option-dialog.component';

describe('AddNewOptionDialogComponent', () => {
  let component: AddNewOptionDialogComponent;
  let fixture: ComponentFixture<AddNewOptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewOptionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
