import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { User } from '../../models/user';

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
     */
    constructor(private http : HttpClient) {}



    /**
     * This method returns all the users.
     * 
     * @returns Return all the users.
     */
    getAllUsers() : Observable<User[]> {
        return this.http.get<User[]>(this.apiURL);
    }



    /**
     * This method returns a specific user.
     * 
     * @param userId The user's id.
     * @returns Return the user.
     */
    getUser(userId : number) : Observable<User> {
        return this.http.get<User>(this.apiURL, {params: new HttpParams().set("id", userId)});
    }



    /**
     * This method add a user.
     * 
     * @param user The user's informations.
     * @return Return the user added.
     */
    addUser(user : User) : Observable<User> {
        return this.http.post<User>(this.apiURL, user);
    }



    /**
     * This method delete a user.
     * 
     * @param userId The user's id.
     * @return Return nothing.
     */
    deleteUser(userId : number) : Observable<void> {
        return this.http.delete<void>(this.apiURL, {params: new HttpParams().set("id", userId)});
    }



    /**
     * This method partially update a user.
     * 
     * @param user The user's informations.
     * @param userId The user's id.
     * @return Return the user updated.
     */
    partialUpdateUser(user : User, userId : number) : Observable<User> {
        return this.http.patch<User>(this.apiURL, user, {params: new HttpParams().set("id", userId)});
    }



    /**
     * This method fully update a user.
     * 
     * @param user The user's informations.
     * @param userId The user's id.
     * @return Return the user updated.
     */
    fullyUpdateUser(user : User, userId : number) : Observable<User> {
        return this.http.put<User>(this.apiURL, user, {params: new HttpParams().set("id", userId)});
    }
}
