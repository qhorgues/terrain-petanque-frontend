import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtPageComponent } from './court-page.component';

describe('CourtPageComponent', () => {
  let component: CourtPageComponent;
  let fixture: ComponentFixture<CourtPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourtPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
