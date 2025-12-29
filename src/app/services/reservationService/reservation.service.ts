import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { ReservationInputInterface } from '../../interfaces/input/reservationInputInterface';
import { ReservationOutputInterface } from '../../interfaces/output/reservationOutputInterface';

/**
 * This class is a service to get CRUD operation for reservations from the backend.
 */
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  /**
    * This attribute is the URL of the backend, precisely for the reservations.
    */
  private apiURL = "/api/v1/reservations";



  /**
    * The constructor.
    *
    * @param http Dependency injection of a httpClient. HttpClient can send and fetch information from the backend.
    */
  constructor(private http : HttpClient) {}



  /**
    * This method returns all the reservations.
    *
    * @returns Return all the reservations.
    */
  getAllReservations() : Observable<ReservationOutputInterface[]> {
    return this.http.get<ReservationOutputInterface[]>(this.apiURL);
  }



  /**
    * This method returns a specific reservation.
    *
    * @param userId The user's id for the reservation.
    * @param courtId The court's id for the reservation.
    * @returns Return the reservation.
    */
  getReservation(userId : number, courtId : number) : Observable<ReservationOutputInterface> {
    const url = this.apiURL + `/user/${userId}/court/${courtId}`;
    return this.http.get<ReservationOutputInterface>(url);
  }



  /**
    * This method creates a reservation.
    *
    * @param reservation The reservation's informations.
    * @param userId The user's id for the reservation.
    * @param courtId The court's id for the reservation.
    * @return Return the reservation added.
    */
  createReservation(reservation : ReservationInputInterface, userId : number, courtId : number) : Observable<ReservationOutputInterface> {
    const url = this.apiURL + `/user/${userId}/court/${courtId}`;
    return this.http.post<ReservationOutputInterface>(url, reservation);
  }



  /**
    * This method delete a reservation.
    *
    * @param userId The user's id for the reservation.
    * @param courtId The court's id for the reservation.
    * @return Return nothing.
    */
  deleteReservation(userId : number, courtId : number) : Observable<void> {
    const url = this.apiURL + `/user/${userId}/court/${courtId}`;
    return this.http.delete<void>(url);
  }



  /**
    * This method partially update a reservation.
    *
    * @param reservation The reservation's informations.
    * @param userId The user's id for the reservation.
    * @param courtId The court's id for the reservation.
    * @return Return the reservation updated.
    */
  partialUpdateReservation(reservation : ReservationInputInterface, userId : number, courtId : number) : Observable<ReservationOutputInterface> {
    const url = this.apiURL + `/user/${userId}/court/${courtId}`;
    return this.http.patch<ReservationOutputInterface>(url, reservation);
  }



  /**
    * This method fully update a reservation.
    *
    * @param reservation The reservation's informations.
    * @param userId The user's id for the reservation.
    * @param courtId The court's id for the reservation.
    * @return Return the reservation updated.
    */
  fullyUpdateReservation(reservation : ReservationInputInterface, userId : number, courtId : number) : Observable<ReservationOutputInterface> {
    const url = this.apiURL + `/user/${userId}/court/${courtId}`;
    return this.http.put<ReservationOutputInterface>(url, reservation);
  }

}
