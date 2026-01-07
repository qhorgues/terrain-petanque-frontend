import { Component } from "@angular/core";
import { MapComponent } from "../../components/map/map.component";

@Component({
  selector: "app-map-page",
  standalone: true,
  imports: [MapComponent],
  templateUrl: "./map.page.html",
  styleUrl: "./map.page.css",
})
export class MapPage {}
