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
    const result = sessionStorage.getItem(this.tokenId);
    if (result === null) return null;

    return jwtDecode<JWTInterface>(result);
  }



  /**
   * This method remove the token from the storage (so make a logout).
   */
  logout(): void {
    sessionStorage.removeItem(this.tokenId);
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
