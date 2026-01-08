import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFieldCheckerComponent } from './password-field-checker.component';

describe('PasswordFieldCheckerComponent', () => {
  let component: PasswordFieldCheckerComponent;
  let fixture: ComponentFixture<PasswordFieldCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordFieldCheckerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordFieldCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
