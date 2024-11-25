import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
export default function CardAlert() {
    return (
        <Card variant="outlined" sx={{ m: 1.5, p: 1.5 }}>
            <CardContent>

                <Typography gutterBottom sx={{ fontWeight: 600 }}>
                    Prueba NexTi
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                    Chris Perez
                </Typography>

            </CardContent>
        </Card>
    );
}
