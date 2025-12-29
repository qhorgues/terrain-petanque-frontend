import { CoordinatesInputInterface } from './coordinatesInputInterface'

/**
 * This interface represents a court.
 * Input entries.
 */
export interface CourtInputInterface {
  /**
   * This field is the court's name.
   */
  name: string;

  /**
   * This field is the court's quantity.
   */
  quantity: number

  /**
   * This field is the court's description.
   */
  description: string;

  /**
   * This field is the court's coordinates.
   */
  coordinates: CoordinatesInputInterface;
}
