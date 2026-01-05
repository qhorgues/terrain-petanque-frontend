import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { CourtInputInterface } from '../../interfaces/input/courtInputInterface';
import { CourtOutputInterface } from '../../interfaces/output/courtOutputInterface';

/**
 * This class is a service to get CRUD operation for courts from the backend.
 */
@Injectable({
  providedIn: 'root'
})
export class CourtService {

  /**
    * This attribute is the URL of the backend, precisely for the courts.
    */
  private apiURL = "/api/v1/courts";



  /**
    * The constructor.
    *
    * @param http Dependency injection of a httpClient. HttpClient can send and fetch information from the backend.
    */
  constructor(private http : HttpClient) {}



  /**
    * This method returns all the courts.
    *
    * @returns Return all the courts.
    */
  getAllCourts() : Observable<CourtOutputInterface[]> {
    return this.http.get<CourtOutputInterface[]>(this.apiURL);
  }



  /**
    * This method returns a specific court.
    *
    * @param courtId The court's id.
    * @returns Return the court.
    */
  getCourt(courtId : number) : Observable<CourtOutputInterface> {
    return this.http.get<CourtOutputInterface>(this.apiURL, {params: new HttpParams().set("id", courtId)});
  }



  /**
    * This method creates a court.
    *
    * @param court The court's informations.
    * @return Return the court added.
    */
  createCourt(court : CourtInputInterface) : Observable<CourtOutputInterface> {
    return this.http.post<CourtOutputInterface>(this.apiURL, court);
  }



  /**
    * This method delete a court.
    *
    * @param courtId The court's id.
    * @return Return nothing.
    */
  deleteCourt(courtId : number) : Observable<void> {
    return this.http.delete<void>(this.apiURL, {params: new HttpParams().set("id", courtId)});
  }



  /**
    * This method partially update a court.
    *
    * @param court The court's informations.
    * @param courtId The court's id.
    * @return Return the court updated.
    */
  partialUpdateCourt(court : CourtInputInterface, courtId : number) : Observable<CourtOutputInterface> {
    return this.http.patch<CourtOutputInterface>(this.apiURL, court, {params: new HttpParams().set("id", courtId)});
  }



  /**
    * This method fully update a court.
    *
    * @param court The court's informations.
    * @param courtId The court's id.
    * @return Return the court updated.
    */
  fullyUpdateCourt(court : CourtInputInterface, courtId : number) : Observable<CourtOutputInterface> {
    return this.http.put<CourtOutputInterface>(this.apiURL, court, {params: new HttpParams().set("id", courtId)});
  }

}
