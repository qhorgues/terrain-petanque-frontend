import { Component } from '@angular/core';
import { NotFoundComponent  } from '../../components/not-found/not-found.component';

/**
 * This class represent the page when we the ressource is unknown.
 */
@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [NotFoundComponent],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css'
})
export class NotFoundPageComponent {

}
