import React from 'react';
import { Link } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Typography,
    Box
} from '@mui/material';

const Menu = ({ open, onClose }) => {
    const labs = [
        { id: '1', title: 'Лабораторная работа 1' },
        { id: '2', title: 'Лабораторная работа 2' },
    ];

    return (
        <Drawer
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 250,
                    bgcolor: '#00AB84',
                    color: 'white',
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Меню</Typography>
                <Divider />
            </Box>
            <List>
                {labs.map((lab) => (
                    <ListItem key={lab.id} disablePadding>
                        <ListItemButton component={Link} to={`/lab/${lab.id}`} onClick={onClose}>
                            <ListItemText primary={lab.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Menu;