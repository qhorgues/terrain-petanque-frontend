import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

/**
 * This class represent a submit button component.
 */
@Component({
  selector: 'app-confirm-button',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './confirm-button.component.html',
  styleUrl: './confirm-button.component.css'
})
export class ConfirmButtonComponent {}
