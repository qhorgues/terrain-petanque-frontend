import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFieldCheckerComponent } from './email-field-checker.component';

describe('EmailFieldCheckerComponent', () => {
  let component: EmailFieldCheckerComponent;
  let fixture: ComponentFixture<EmailFieldCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailFieldCheckerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailFieldCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
