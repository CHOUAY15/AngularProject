import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleFolderComponent } from './detaille-folder.component';

describe('DetailleFolderComponent', () => {
  let component: DetailleFolderComponent;
  let fixture: ComponentFixture<DetailleFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailleFolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailleFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
