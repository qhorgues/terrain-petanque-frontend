import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.css'
})
export class TextFieldComponent {
  /**
   * This attribute represents the form of the field.
   */
  readonly form = new FormControl('');



  /**
   * This attribute represents the label of the field.
   */
  label = input<string>('')



  /**
   *This attribute represents the placeholder of the field.
   */
  placeholder = input<string>('')



  /**
   * This attribute represents the value of the field.
   */
  value = output<string | null>();



  /**
   * This method update the field when it changes.
   */
  updatePassword() {
    this.value.emit(this.form.value);
  }

}
