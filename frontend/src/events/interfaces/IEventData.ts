export interface Event {
    id: string;
    nameEvent: string;
    description: string;
    location: string;
    price: string;
    dateEvent: string;
    createAt: string;
}

export interface EventAdd {
    nameEvent: string;
    description: string;
    location: string;
    dateEvent: string;
    price: number;
}

export interface EventApiResponse {
    events: Event[];
    hasPrevious: boolean;
    hasNext: boolean;
    totalPages: number;
    totalRecords: number;
}
