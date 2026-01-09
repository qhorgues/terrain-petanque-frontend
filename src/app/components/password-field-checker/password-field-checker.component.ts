import { Component, ViewEncapsulation, effect, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';

/**
 * This component represents a password checker field component.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-password-field-checker',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './password-field-checker.component.html',
  styleUrl: './password-field-checker.component.css'
})
export class PasswordFieldCheckerComponent {
  /**
   * This attribute represents if the password is hidden or not.
   */
  hide = true;



  /**
   * This attribute represents the form of the field.
   */
  readonly form = new FormControl('', [this.matchValidPasswordValidator()]);



  /**
   * This attribute represents the value they need to be respected.
   */
  valid_password = input<string | null>();



  /**
   * This attribute represents the value emit by the field.
   */
  password = output<string | null>();



  /**
   * This attribute represents the error message.
   */
  errorMessage = signal('');



  /**
   * The constructor.
   */
  constructor() {
    merge(this.form.statusChanges, this.form.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePassword());
  }



  /**
   * This method update the password when it changes.
   */
  updatePassword() {
    if (this.form.hasError('passwordMismatch')) {
      this.errorMessage.set("Les mots de passe ne se correspondent pas")
    } else {
      this.errorMessage.set('');
    }

    this.password.emit(this.form.value);
  }



  /**
   * This method invalid the password if it's not the same.
   *
   * @return Return a Validator with the error "passwordMismatch"
   */
  matchValidPasswordValidator() : ValidatorFn {
    return (control: AbstractControl) => {
      if (!this.valid_password) return null;
      return control.value === this.valid_password() ? null : { passwordMismatch: true };
    };
  }



  /**
   * This method skip the toggle button when press the touch "enter"
   *
   * @param event The event register.
   */
  skipButton(event: Event) {
    event.preventDefault();
    const formField = event.target as HTMLElement;
    const focusable = Array.from(document.querySelectorAll<HTMLElement>(
      'input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.hasAttribute('disabled'));

    const index = focusable.indexOf(formField);

    if (index >= 0 && index + 2 < focusable.length) {
      focusable[index + 2].focus();
    }
  }

}
