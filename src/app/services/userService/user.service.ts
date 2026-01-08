import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { UserInputInterface } from '../../interfaces/input/userInputInterface';
import { UserOutputInterface } from '../../interfaces/output/userOutputInterface';
import { AuthService } from '../auth/auth.service';

/**
 * This class is a service to get CRUD operation for users from the backend.
 */
@Injectable({
    providedIn: 'root'
})
export class UserService {

  /**
    * This attribute is the URL of the backend, precisely for the users.
    */
  private apiURL = "/api/v1/users";



  /**
    * The constructor.
    *
    * @param http Dependency injection of a httpClient. HttpClient can send and fetch information from the backend.
    * @param authService Dependency injection of the authentification service.
    */
  constructor(private http : HttpClient, private authService : AuthService) {}



  /**
    * This method returns all the users.
    *
    * @returns Return all the users.
    */
  getAllUsers() : Observable<UserOutputInterface[]> {
    return this.http.get<UserOutputInterface[]>(this.apiURL);
  }



  /**
    * This method returns a specific user.
    *
    * @param userId The user's id.
    * @returns Return the user.
    */
  getUser(userId : number) : Observable<UserOutputInterface> {
    return this.http.get<UserOutputInterface>(this.apiURL + `/${userId}`);
  }



  /**
    * This method creates a user.
    *
    * @param user The user's informations.
    * @return Return the user added.
    */
  createUser(user : UserInputInterface) : Observable<UserOutputInterface> {
    return this.http.post<UserOutputInterface>(this.apiURL, user);
  }



  /**
    * This method delete a user.
    *
    * @param userId The user's id.
    * @return Return nothing.
    */
  deleteUser(userId : number) : Observable<void> {
    return this.http.delete<void>(this.apiURL + `/${userId}`);
  }



  /**
    * This method partially update a user.
    *
    * @param user The user's informations.
    * @param userId The user's id.
    * @return Return the user updated.
    */
  partialUpdateUser(user : UserInputInterface, userId : number) : Observable<UserOutputInterface> {
    return this.http.patch<UserOutputInterface>(this.apiURL + `/${userId}`, user);
  }



  /**
    * This method fully update a user.
    *
    * @param user The user's informations.
    * @param userId The user's id.
    * @return Return the user updated.
    */
  fullyUpdateUser(user : UserInputInterface, userId : number) : Observable<UserOutputInterface> {
    return this.http.put<UserOutputInterface>(this.apiURL + `/${userId}`, user);
  }



  /**
    * This method logs in a user.
    *
    * @param user The user's credential.
    * @param callback The function to handle the return, the return is a boolean.
    * @return Return true if the credential are success, false otherwise.
    */
  login(user: UserInputInterface, callback: (success: boolean) => void): void {
  this.http.post<any>(this.apiURL + "/login", user).subscribe({
    next: response => {
      this.authService.saveToken(response.token);
      callback(true);
    },
    error: error => {
      callback(false);
    }
  });
}

}
