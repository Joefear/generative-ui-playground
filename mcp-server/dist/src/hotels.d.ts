/**
 * Hotel booking data layer for the UI Protocols Demo.
 * Contains mock hotel data, search, room selection, and booking logic.
 */
export type RoomType = "standard" | "deluxe" | "suite" | "penthouse" | "family";
export interface City {
    id: string;
    name: string;
    country: string;
    code: string;
}
export interface Amenity {
    id: string;
    name: string;
    icon: string;
}
export interface Room {
    id: string;
    type: RoomType;
    name: string;
    description: string;
    maxGuests: number;
    bedType: string;
    pricePerNight: number;
    amenities: string[];
    available: number;
}
export interface Hotel {
    id: string;
    name: string;
    city: City;
    address: string;
    rating: number;
    reviewCount: number;
    priceRange: {
        min: number;
        max: number;
    };
    amenities: Amenity[];
    rooms: Room[];
    imageUrl?: string;
}
export interface Guest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}
export interface HotelSearch {
    id: string;
    hotels: Hotel[];
    searchParams: {
        city: string;
        checkIn: string;
        checkOut: string;
        guests: number;
        rooms: number;
    };
    selectedHotelId?: string;
    selectedRoomId?: string;
}
export interface HotelBooking {
    confirmationNumber: string;
    hotel: Hotel;
    room: Room;
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: Guest[];
    totalPrice: number;
    bookedAt: string;
}
export declare const hotelSearches: Map<string, HotelSearch>;
export declare const hotelBookings: Map<string, HotelBooking>;
export declare function getCities(): City[];
export declare function searchHotels(params: {
    city: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms?: number;
}): HotelSearch;
export declare function getHotelSearch(searchId: string): HotelSearch | undefined;
export declare function selectHotel(searchId: string, hotelId: string): {
    hotel: Hotel;
    rooms: Room[];
} | undefined;
export declare function selectRoom(searchId: string, roomId: string): {
    room: Room;
    priceBreakdown: {
        perNight: number;
        nights: number;
        total: number;
    };
} | undefined;
export declare function createHotelBooking(searchId: string, guests: Guest[]): {
    success: boolean;
    message: string;
    booking?: HotelBooking;
};
export declare function getHotelBooking(confirmationNumber: string): HotelBooking | undefined;
