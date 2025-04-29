import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import Profile from "./Profile";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ onMenuToggle }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <AppBar position="static" sx={{ bgcolor: '#00AB84', mb: 2 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    onClick={onMenuToggle}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                <Box sx={{ display: 'flex', mr: 2 }}>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                        sx={{ mr: 1 }}
                    >
                        Главная
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/about"
                    >
                        О себе
                    </Button>
                </Box>

                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, textAlign: 'center' }}
                >
                    Лабораторные работы
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={toggleTheme} color="inherit">
                        {theme === "light" ? "🌑" : "☀️"}
                    </IconButton>
                    <Profile />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;