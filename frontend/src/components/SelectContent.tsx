import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Select, { SelectChangeEvent, selectClasses } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import {useState} from 'react';

const Avatar = styled(MuiAvatar)(({ theme }) => ({
    width: 28,
    height: 28,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
    minWidth: 0,
    marginRight: 12,
});

export default function SelectContent() {
    const [company, setCompany] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCompany(event.target.value as string);
    };

    return (
        <Select
            labelId="company-select"
            id="company-simple-select"
            value={company}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Select company' }}
            fullWidth
            sx={{
                maxHeight: 56,
                width: 215,
                '&.MuiList-root': {
                    p: '8px',
                },
                [`& .${selectClasses.select}`]: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    pl: 1,
                },
            }}
        >
            <ListSubheader sx={{ pt: 0 }}>Eventos</ListSubheader>
            <MenuItem value="">
                <ListItemAvatar>
                    <Avatar alt="Sitemark web">
                        <DevicesRoundedIcon sx={{ fontSize: '1rem' }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Gestión Eventos" secondary="Eventos" />
            </MenuItem>
        </Select>
    );
}
