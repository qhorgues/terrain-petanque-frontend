/**
 * This interface represents the JSON Web Token.
 */
export interface JWTInterface {
  // === HEADER ===

  /**
   * This field is the subject.
   */
  sub: string;

  /**
   * This field is the experiration date.
   */
  exp: number;

  /**
   * This field is when the token signed.
   */
  iat: number;



  // === PAYLOAD ===

  /**
   * This field is the user's id.
   */
  id: number;

  /**
   * This field is the user's name.
   */
  name: string;

  /**
   * This field is the user's surname.
   */
  surname: string;

  /**
   * This field is the user's mail.
   */
  mail: string;

  /**
   * This field is the user's username.
   */
  username: string;
}
