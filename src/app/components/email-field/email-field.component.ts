import { Component, signal, output } from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {merge} from 'rxjs';

/**
 * This class represent a email field component.
 */
@Component({
  selector: 'app-email-field',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './email-field.component.html',
  styleUrl: './email-field.component.css'
})
export class EmailFieldComponent {
  /**
   * This attribute represents the form of the field.
   */
  readonly form = new FormControl('', [Validators.required, Validators.email]);



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
    } else {
      this.errorMessage.set('');
    }

    this.email.emit(this.form.value);
  }
}
