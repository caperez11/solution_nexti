// EventManager.tsx
import React, {useState} from 'react';
import EventList from './EventList';
import AddEventDialog, {Event} from './AddEventDialog';
import useEventStore from '../../stores/event.store';
import {GridRowSelectionModel} from '@mui/x-data-grid';

const EventManager: React.FC = () => {
    const {addEvent, deleteEvent, fetchEvents} = useEventStore();
    const [openAddDialog, setOpenAddDialog] = useState(false);

    const handleAddEvent = async (event: Event) => {
        await addEvent(event);
        setOpenAddDialog(false);
        fetchEvents(1, 5).then() // Refresca la lista de eventos
    };

    const handleDeleteEvent = async (selectedIds:GridRowSelectionModel) => {
        console.log(selectedIds);
        for (const id of selectedIds) {
            await deleteEvent(id.toString());
        }
        fetchEvents(1, 5).then(); // Refresca la lista de eventos
    };

    return (
        <>
            <EventList
                onAddEvent={() => setOpenAddDialog(true)}
                onDeleteEvent={handleDeleteEvent}
            />
            <AddEventDialog
                open={openAddDialog}
                onClose={() => setOpenAddDialog(false)}
                onAdd={handleAddEvent}
            />
        </>
    );
};

export default EventManager;
