// AddEventDialog.tsx
import React, {useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Snackbar, Alert} from '@mui/material';
import {useForm, Controller} from 'react-hook-form';

export interface Event {
    nameEvent: string;
    description: string;
    location: string;
    price: number;
    dateEvent: string;
}

interface AddEventDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (data: Event) => void;
}

const AddEventDialog: React.FC<AddEventDialogProps> = ({open, onClose, onAdd}) => {
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

    const handleCancel = () => {
        reset();
        onClose();
        setShowCancelAlert(true);
    };

    const onSubmit = (data: Event) => {
        onAdd(data);
        reset();
    };

    return (
        <>
        <Dialog open={open} onClose={handleCancel}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <Button onClick={handleCancel} color="error">
                        Cancelar
                    </Button>
                    <Button type="submit" color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
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
        </>
    );
};

export default AddEventDialog;
