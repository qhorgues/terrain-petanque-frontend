import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtDialogComponent } from './court-dialog.component';

describe('CourtDialogComponent', () => {
  let component: CourtDialogComponent;
  let fixture: ComponentFixture<CourtDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
