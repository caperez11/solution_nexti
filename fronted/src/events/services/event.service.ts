import {eventApi} from '../../api/event.api.ts';
import {EventApiResponse, EventAdd} from '../interfaces/IEventData.ts';


export const getEventsService = async (pageNumber: number, pageSize: number): Promise<EventApiResponse> => {
    const response = await eventApi.get<EventApiResponse>('/event', {
        params: {
            pageNumber,
            pageSize,
        }
    });

    return response.data;
};

export const addEventService = async (event: EventAdd): Promise<void> => {
    await eventApi.post('/event', event);
}


export const deleteEventService = async (eventId: string): Promise<void> => {
    await eventApi.delete(`/event/${eventId}`);
}

