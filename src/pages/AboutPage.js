import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

const AboutPage = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Информация
                    </Typography>
                    <Typography variant="body1" >
                        Здесь что-то будет
                    </Typography>
                </Grid>

            </Grid>
        </Container>
    );
}

export default AboutPage;