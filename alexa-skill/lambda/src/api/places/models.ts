export interface PlacesResponse {
    data: Place[];
}

export interface Place {
    name: string;
    city_id: string;
}

export interface CityResponse {
    data: City[];
}

export interface City {
    city_name: string;
}
