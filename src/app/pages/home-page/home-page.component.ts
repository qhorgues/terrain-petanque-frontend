import { Component } from '@angular/core';
import { HomeComponent } from '../../components/home/home.component';

/**
 * This class represents the home page.
 */
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
