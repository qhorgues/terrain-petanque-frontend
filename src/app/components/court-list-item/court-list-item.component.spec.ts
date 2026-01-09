import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtListItemComponent } from './court-list-item.component';

describe('CourtListItemComponent', () => {
  let component: CourtListItemComponent;
  let fixture: ComponentFixture<CourtListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourtListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
