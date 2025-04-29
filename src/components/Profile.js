import React from "react";
import { Button, Box } from "@mui/material";
import useLoginState from "../hooks/useLoginState";
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
const Profile = () => {
    const { logout } = useLoginState();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" onClick={logout}><ExitToAppTwoToneIcon /></Button>
        </Box>
    );
};

export default Profile;