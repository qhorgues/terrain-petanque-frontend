/**
 * This interface represents a reservation.
 * Output entries.
 */
export interface ReservationOutputInterface {
  /**
   * This field is the user's id for the reservation.
   */
  userId: number;

  /**
   * This field is the court's id for the reservation.
   */
  courtId: number;

  /**
   * This fiels is the 'reservation'.
   */
  reservation: number;
}
