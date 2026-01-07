import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { JWTInterface } from '../../interfaces/jwt/jwtInterface';

/**
 * This class is the service of authentification.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * This attribute represents the token's name inside the session storage.
   */
  private readonly tokenId = "token";



  /**
   * This method saves the token in the session storage.
   *
   * @param token The token.
   */
  saveToken(token : string) : void {
    sessionStorage.setItem(this.tokenId, token);
  }



  /**
   * This method returns the token.
   *
   * @returns Return the token. Null if the token is not in the storage.
   */
  getToken(): JWTInterface | null {
    const token = sessionStorage.getItem(this.tokenId);
    if (token === null) return null;

    const result = jwtDecode<JWTInterface>(token);

    // If the token is expired, disable the user connection.
    if (Date.now() > result.exp * 1000) { //The expiration is not in millisecond.
      this.logout();
      return null;
    }

    return result;
  }



  /**
   * This method remove the token from the storage (so make a logout).
   */
  logout(): void {
    sessionStorage.removeItem(this.tokenId);
    window.location.href = "/login"; //Force disconnection, it's used to remove the up bar.
  }



  /**
   * This method checks if the token is in the storage.
   *
   * @returns Return true if it in the storage, false otherwise.
   */
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

}
