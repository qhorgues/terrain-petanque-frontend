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
