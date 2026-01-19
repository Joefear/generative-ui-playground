/**
 * Flight booking data layer for the UI Protocols Demo.
 * Contains mock airport/airline data, flight search, seat selection, and booking logic.
 */
export type CabinClass = "economy" | "business" | "first";
export type SeatStatus = "available" | "occupied" | "selected" | "exit";
export interface Airport {
    code: string;
    city: string;
    name: string;
    country: string;
}
export interface Airline {
    code: string;
    name: string;
    color: string;
}
export interface Seat {
    id: string;
    row: number;
    position: string;
    status: SeatStatus;
    isWindow: boolean;
    isAisle: boolean;
    isExitRow: boolean;
    price: number;
}
export interface Flight {
    id: string;
    airline: Airline;
    flightNumber: string;
    origin: Airport;
    destination: Airport;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    stops: number;
    aircraft: string;
    price: number;
    cabinClass: CabinClass;
    seatsAvailable: number;
}
export interface FlightSearch {
    id: string;
    flights: Flight[];
    searchParams: {
        origin: string;
        destination: string;
        date: string;
        passengers: number;
        cabinClass: CabinClass;
    };
    selectedFlightId?: string;
    selectedSeats?: string[];
}
export interface Passenger {
    name: string;
    email: string;
    phone: string;
}
export interface Booking {
    confirmationNumber: string;
    flight: Flight;
    passengers: Passenger[];
    seats: string[];
    totalPrice: number;
    bookedAt: string;
}
export declare const flightSearches: Map<string, FlightSearch>;
export declare const bookings: Map<string, Booking>;
export declare function getAirports(): Airport[];
export declare function getAirportByCode(code: string): Airport | undefined;
export declare function searchFlights(params: {
    origin: string;
    destination: string;
    departureDate: string;
    passengers: number;
    cabinClass?: CabinClass;
}): FlightSearch;
export declare function getFlightSearch(searchId: string): FlightSearch | undefined;
export declare function selectFlight(searchId: string, flightId: string): {
    flight: Flight;
    seatMap: Seat[][];
} | undefined;
export declare function generateSeatMap(flightId: string): Seat[][];
export declare function selectSeats(searchId: string, flightId: string, seatIds: string[]): {
    success: boolean;
    message: string;
    selectedSeats?: string[];
    totalSeatFee?: number;
};
export declare function createBooking(searchId: string, passengers: Passenger[]): {
    success: boolean;
    message: string;
    booking?: Booking;
};
export declare function getBooking(confirmationNumber: string): Booking | undefined;
