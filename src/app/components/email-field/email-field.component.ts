import { Component, signal, output } from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {merge} from 'rxjs';

@Component({
  selector: 'app-email-field',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './email-field.component.html',
  styleUrl: './email-field.component.css'
})
export class EmailFieldComponent {
  readonly form = new FormControl('', [Validators.required, Validators.email]);
  email = output<string | null>();

  errorMessage = signal('');

  constructor() {
    merge(this.form.statusChanges, this.form.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateMail());
  }

  updateMail() {
    if (this.form.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.form.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }

    this.email.emit(this.form.value);
  }
}
