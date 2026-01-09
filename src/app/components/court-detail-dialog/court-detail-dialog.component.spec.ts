import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtDetailDialogComponent } from './court-detail-dialog.component';

describe('CourtDetailDialogComponent', () => {
  let component: CourtDetailDialogComponent;
  let fixture: ComponentFixture<CourtDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtDetailDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourtDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
