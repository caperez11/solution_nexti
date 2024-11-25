import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppTheme from './theme/AppTheme';
import AppNavbar from './components/AppNavbar.tsx';
import SideMenu from './components/SideMenu.tsx';
import Header from './components/Header.tsx';
import EventsPage from './events/pages/Events.tsx';

const xThemeComponents = {};

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
    return (
        <AppTheme {...props} themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <AppNavbar />
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme.palette.background.default,
                        overflow: 'auto',
                    })}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <Header />
                        <EventsPage />
                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    );
}
