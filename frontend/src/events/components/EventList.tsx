// EventList.tsx
import React, {useState, useEffect} from 'react';
import {DataGrid, GridRowsProp, GridColDef, GridPaginationModel, GridRowSelectionModel} from '@mui/x-data-grid';
import {Box, Button, Stack} from '@mui/material';
import useEventStore from '../../stores/event.store';

const columns: GridColDef[] = [
    {field: 'nameEvent', headerName: 'Nombre del Evento', flex: 1.5, minWidth: 200},
    {field: 'description', headerName: 'Descripción', flex: 1, minWidth: 200},
    {field: 'location', headerName: 'Ubicación', flex: 0.5, minWidth: 100},
    {
        field: 'dateEvent',
        headerName: 'Fecha del Evento',
        flex: 1,
        minWidth: 150,
        renderCell: (params) => <span>{new Date(params.value).toLocaleString()}</span>,
    },
    {field: 'price', headerName: 'Precio', flex: 0.5, minWidth: 100},
];

interface EventListProps {
    onAddEvent: () => void;
    onDeleteEvent: (selectedIds: GridRowSelectionModel) => void;
}

const EventList: React.FC<EventListProps> = ({onAddEvent, onDeleteEvent}) => {
    const {events, fetchEvents} = useEventStore();
    const rowCount = useEventStore((state) => state.totalRecords);

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        pageSize: 5,
        page: 0,
    });

    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);

    useEffect(() => {
        fetchEvents(paginationModel.page + 1, paginationModel.pageSize).then();
    }, [paginationModel, fetchEvents]);

    const rows: GridRowsProp = events.map((event) => ({
        id: event.id,
        nameEvent: event.nameEvent,
        description: event.description,
        location: event.location,
        price: event.price,
        dateEvent: event.dateEvent,
    }));

    return (
        <Box sx={{width: '100%'}}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 2,
                }}
            >
                <h2>Gestión de Eventos</h2>
                <Stack direction="row" spacing={1}>
                    <Button variant="contained" color="primary" onClick={onAddEvent}>
                        Agregar
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        disabled={selectionModel.length === 0}
                        onClick={() => onDeleteEvent(selectionModel)}
                    >
                        Eliminar
                    </Button>
                </Stack>
            </Box>
            <DataGrid
                rows={rows}
                columns={columns}
                pagination
                paginationMode="server"
                paginationModel={paginationModel}
                rowCount={rowCount}
                onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
                pageSizeOptions={[5, 10, 20, 50]}
                checkboxSelection
                onRowSelectionModelChange={(newSelection) => setSelectionModel(newSelection)}
                density="comfortable"
            />
        </Box>
    );
};

export default EventList;
