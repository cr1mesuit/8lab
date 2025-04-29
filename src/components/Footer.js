import React, { useState } from 'react';
import {
    Box,
    BottomNavigation,
    BottomNavigationAction,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton
} from '@mui/material';
import {
    Feedback,
    ContactMail,
    Close
} from '@mui/icons-material';
import FeedbackForm from './FeedbackForm';

const Footer = () => {
    const [value, setValue] = useState(null);
    const [openFeedback, setOpenFeedback] = useState(false);

    const handleAction = (newValue) => {
        setValue(newValue);
        switch(newValue) {
            case 'feedback':
                setOpenFeedback(true);
                break;
            case 'contact':

                break;

            default:
                break;
        }
    };

    return (
        <>
            <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => handleAction(newValue)}
                    sx={{
                        bgcolor: '#00AB84',
                        '& .MuiBottomNavigationAction-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&.Mui-selected': {
                                color: 'white',
                            },
                        },
                    }}
                >
                    <BottomNavigationAction
                        label="Обратная связь"
                        value="feedback"
                        icon={<Feedback />}
                    />
                    <BottomNavigationAction
                        label="Контакты"
                        value="contact"
                        icon={<ContactMail />}
                    />
                </BottomNavigation>
            </Box>

            <Dialog
                open={openFeedback}
                onClose={() => setOpenFeedback(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    Обратная связь
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpenFeedback(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <FeedbackForm />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Footer;