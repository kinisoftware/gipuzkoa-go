export interface EventsResponse {
    data: Events;
}

export interface Events {
    items: Event[];
}

export interface Event {
    nameEs: string;
    startDate: string;
    endDate: string;
    municipalityEs: string;
    municipalityNoraCode: number;
    provinceNoraCode: number;
    establishmentEs: string;
}
