import { Component, OnDestroy, AfterViewInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as L from "leaflet";
import { CourtService } from "../../services/courtService/court.service";
import { CourtOutputInterface } from "../../interfaces/output/courtOutputInterface";

@Component({
  selector: "app-map",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private map: L.Map | undefined;
  courts: CourtOutputInterface[] = [];

  constructor(private courtService: CourtService) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.loadCourts();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    this.map = L.map("map").setView([46.603354, 1.888334], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.map);
  }

  private loadCourts(): void {
    this.courtService.getAllCourts().subscribe({
      next: (courts) => {
        this.courts = courts;
        this.displayMarkers();
      },
      error: (err) => {
        console.error("Erreur chargement terrains:", err);
      },
    });
  }

  private displayMarkers(): void {
    if (!this.map) return;

    this.courts.forEach((court) => {
      // Vérifier que les coordonnées existent
      if (!court.coordinates) {
        console.warn(`Terrain sans coordonnées: ${court.name}`);
        return;
      }

      const lat = Number(court.coordinates.latitude);
      const lng = Number(court.coordinates.longitude);

      // Vérifier que les coordonnées sont valides
      if (
        !isNaN(lat) &&
        !isNaN(lng) &&
        lat >= -90 &&
        lat <= 90 &&
        lng >= -180 &&
        lng <= 180
      ) {
        L.marker([lat, lng])
          .addTo(this.map!)
          .bindPopup(`<b>${court.name}</b><br>Quantité: ${court.quantity}`);
      } else {
        console.warn(
          `Coordonnées invalides pour ${court.name}: lat=${lat}, lng=${lng}`,
        );
      }
    });
  }
}
