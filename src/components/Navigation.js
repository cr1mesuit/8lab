import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <AppBar position="static" sx={{ bgcolor: '#00AB84' }}>
            <Toolbar>
                <Button color="inherit" component={Link} to="/">
                    Главная
                </Button>
                <Button color="inherit" component={Link} to="/about">
                    О себе
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;