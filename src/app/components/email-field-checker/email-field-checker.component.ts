import { Component, signal, output, input } from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AbstractControl, FormControl, FormsModule, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {merge} from 'rxjs';

/**
 * This class represent a email checker field component.
 */
@Component({
  selector: 'app-email-field-checker',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './email-field-checker.component.html',
  styleUrl: './email-field-checker.component.css'
})
export class EmailFieldCheckerComponent {
  /**
   * This attribute represents the form of the field.
   */
  readonly form = new FormControl('', [Validators.required, Validators.email, this.matchValidEmailValidator()]);



  /**
   * This attribute represents the value they need to be respected.
   */
  valid_email = input<string>();



  /**
   * This attribute represents the value emit by the field.
   */
  email = output<string | null>();



  /**
   * This attribute represents the error message when the mail is invalid.
   */
  errorMessage = signal('');



  /**
   * The constructor.
   */
  constructor() {
    merge(this.form.statusChanges, this.form.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateMail());
  }



  /**
   * This method handle when the field is modified, update all the componenent.
   */
  updateMail() {
    if (this.form.hasError('required')) {
      this.errorMessage.set('Vous devez entrez une valeur');
    } else if (this.form.hasError('email')) {
      this.errorMessage.set("Ce n'est pas un email valide");
    } else if (this.form.hasError('emailMismatch')) {
      this.errorMessage.set("Les emails ne se correspondent pas")
    } else {
      this.errorMessage.set('');
    }

    this.email.emit(this.form.value);
  }



  /**
   * This method invalid the email if it's not the same.
   *
   * @return Return a Validator with the error "emailMismatch"
   */
  matchValidEmailValidator() : ValidatorFn {
    return (control: AbstractControl) => {
      if (!this.valid_email) return null;
      return control.value === this.valid_email() ? null : { emailMismatch: true };
    };
  }

}
