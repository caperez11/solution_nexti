import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Grid2} from '@mui/material';

import EventManager from '../components/EventManager.tsx';



export default function Events() {
return (
    <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>

        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Details
        </Typography>
        <Grid2 container spacing={2} columns={12}>
            <Grid2 size={{ xs: 12, lg: 9 }}>
                <EventManager />
            </Grid2>

        </Grid2>
    </Box> );
}