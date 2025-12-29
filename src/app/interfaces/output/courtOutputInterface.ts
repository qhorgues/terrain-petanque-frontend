import { CoordinatesOutputInterface } from "./coordinatesOutputInterface";

/**
 * This interface represents a court.
 * Output entries.
 */
export interface CourtOutputInterface {
  /**
   * This field is the court's id.
   */
  id: number;

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
  coordinates: CoordinatesOutputInterface;
}
