import { Component, ViewEncapsulation, output} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

/**
 * This component represents a password field component.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-password-field',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.css'
})
export class PasswordFieldComponent {
  /**
   * This attribute represents if the password is hidden or not.
   */
  hide = true;



  /**
   * This attribute represents the form of the field.
   */
  readonly form = new FormControl('');



  /**
   * This attribute represents the value emit by the field.
   */
  password = output<string | null>();



  /**
   * This method update the password when it changes.
   */
  updatePassword() {
    this.password.emit(this.form.value);
  }
}
