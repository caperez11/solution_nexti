import React, {useEffect, useState} from 'react';
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridPaginationModel,
    GridRowSelectionModel,
} from '@mui/x-data-grid';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box,
    Snackbar,
    Alert,
} from '@mui/material';
import {useForm, Controller} from 'react-hook-form';
import Stack from '@mui/material/Stack';
import useEventStore from '../../stores/event.store';

// Interfaz para el evento
export interface Event {
    nameEvent: string;
    description: string;
    location: string;
    price: number;
    dateEvent: string;
}

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

const CustomizedDataGrid: React.FC = () => {
    const {events, loading, error, fetchEvents, deleteEvent, addEvent} = useEventStore();
    const rowCount = useEventStore((state) => state.totalRecords);

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        pageSize: 5,
        page: 0,
    });

    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [showCancelAlert, setShowCancelAlert] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<Event>({
        defaultValues: {
            nameEvent: '',
            description: '',
            location: '',
            price: 0,
            dateEvent: '',
        },
    });

    useEffect(() => {
        fetchEvents(paginationModel.page + 1, paginationModel.pageSize).then();
    }, [paginationModel, fetchEvents]);

    const handleDelete = async () => {
        for (const id of selectionModel) {
            await deleteEvent(id.toString());
        }
        setOpenDeleteDialog(false);
        setSelectionModel([]);
    };

    const handleAddEvent = async (data: Event) => {
        await addEvent(data);
        setOpenAddDialog(false);
        reset();
        fetchEvents(paginationModel.page + 1, paginationModel.pageSize).then();
    };

    const handleCancelAddEvent = () => {
        reset();
        setOpenAddDialog(false);
        setShowCancelAlert(true);
    };

    const rows: GridRowsProp = events.map((event) => ({
        id: event.id,
        nameEvent: event.nameEvent,
        description: event.description,
        location: event.location,
        price: event.price,
        dateEvent: event.dateEvent,
    }));

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenAddDialog(true)}
                    >
                        Agregar
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        disabled={selectionModel.length === 0}
                        onClick={() => setOpenDeleteDialog(true)}
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
                disableColumnResize
                density="comfortable"
                localeText={{
                    MuiTablePagination: {
                        labelRowsPerPage: 'Filas por página:',
                        labelDisplayedRows: ({from, to, count}) =>
                            `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`,
                    },
                }}
            />
            {/* Dialogo de eliminación */}
            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">¿Eliminar Eventos?</DialogTitle>
                <DialogContent>
                    ¿Estás seguro de que deseas eliminar los {selectionModel.length} eventos
                    seleccionados? Esta acción no se puede deshacer.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        No
                    </Button>
                    <Button onClick={handleDelete} color="error" autoFocus>
                        Sí
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialogo de agregar evento */}
            <Dialog
                open={openAddDialog}
                onClose={handleCancelAddEvent}
                aria-labelledby="form-dialog-title"
            >
                <form onSubmit={handleSubmit(handleAddEvent)}>
                    <DialogTitle id="form-dialog-title">Agregar Nuevo Evento</DialogTitle>
                    <DialogContent>
                        <Controller
                            name="nameEvent"
                            control={control}
                            rules={{required: 'El nombre del evento es obligatorio'}}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    margin="dense"
                                    label="Nombre del Evento"
                                    fullWidth
                                    error={!!errors.nameEvent}
                                    helperText={errors.nameEvent?.message}
                                />
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            rules={{required: 'La descripción es obligatoria'}}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    margin="dense"
                                    label="Descripción"
                                    fullWidth
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />
                            )}
                        />
                        <Controller
                            name="location"
                            control={control}
                            rules={{required: 'La ubicación es obligatoria'}}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    margin="dense"
                                    label="Ubicación"
                                    fullWidth
                                    error={!!errors.location}
                                    helperText={errors.location?.message}
                                />
                            )}
                        />
                        <Controller
                            name="dateEvent"
                            control={control}
                            rules={{
                                required: 'La fecha del evento es obligatoria',
                                validate: (value) => {
                                    const currentDate = new Date();
                                    const eventDate = new Date(value);
                                    return (
                                        eventDate > currentDate || 'La fecha debe ser mayor a la actual'
                                    );
                                },
                            }}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    margin="dense"
                                    label="Fecha del Evento"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    error={!!errors.dateEvent}
                                    helperText={errors.dateEvent?.message}
                                />
                            )}
                        />
                        <Controller
                            name="price"
                            control={control}
                            rules={{
                                required: 'El precio es obligatorio',
                                validate: (value) =>
                                    value > 0 || 'El precio debe ser mayor a cero',
                            }}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    margin="dense"
                                    label="Precio"
                                    type="number"
                                    fullWidth
                                    error={!!errors.price}
                                    helperText={errors.price?.message}
                                />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelAddEvent} color="error">
                            Cancelar
                        </Button>
                        <Button type="submit" color="primary">
                            Guardar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Mensaje de alerta al cancelar */}
            <Snackbar
                open={showCancelAlert}
                autoHideDuration={3000}
                onClose={() => setShowCancelAlert(false)}
            >
                <Alert
                    onClose={() => setShowCancelAlert(false)}
                    severity="info"
                    sx={{width: '100%'}}
                >
                    Los datos ingresados fueron descartados.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CustomizedDataGrid;
