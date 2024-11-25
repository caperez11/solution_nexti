

// Definición del estado y las acciones
import {EventApiResponse,Event, EventAdd} from '../events/interfaces/IEventData.ts';
import {addEventService, deleteEventService, getEventsService} from '../events/services/event.service.ts';
import {create} from 'zustand';

interface EventState {
    events: Event[];
    hasPrevious: boolean;
    hasNext: boolean;
    loading: boolean;
    totalPages: number;
    totalRecords: number;
    error: string | null;
    fetchEvents: (pageNumber: number, pageSize: number) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
    addEvent: (event: EventAdd) => Promise<void>;
}

const useEventStore = create<EventState>((set) => ({
    events: [],
    hasPrevious: false,
    hasNext: false,
    totalPages: 0,
    totalRecords: 0,
    loading: false,
    error: null,
    fetchEvents: async (pageNumber: number, pageSize: number) => {
        set({ loading: true, error: null });
        try {
            const data: EventApiResponse = await getEventsService(pageNumber, pageSize);
            set({
                events: data.events,
                hasPrevious: data.hasPrevious,
                hasNext: data.hasNext,
                totalPages: data.totalPages,
                totalRecords: data.totalRecords,
                loading: false,
                error: null,
            });
        } catch (error) {
            set({ loading: false, error: (error as Error).message });
        }
    },
    deleteEvent: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await deleteEventService(id);

            const data: EventApiResponse = await getEventsService(1, 5);
            set({
                events: data.events,
                hasPrevious: data.hasPrevious,
                hasNext: data.hasNext,
                totalPages: data.totalPages,
                totalRecords: data.totalRecords,
                loading: false,
            })
        }
        catch (error) {
            set({ loading: false, error: (error as Error).message });
        }

    },
    addEvent: async (event: EventAdd) => {
        set({ loading: true, error: null });
        try {
            await addEventService(event);
            const data: EventApiResponse = await getEventsService(1, 5);
            set({
                events: data.events,
                hasPrevious: data.hasPrevious,
                hasNext: data.hasNext,
                totalPages: data.totalPages,
            })
        }
        catch (error) {
            set({ loading: false, error: (error as Error).message });
        }
    }
}));

export default useEventStore;