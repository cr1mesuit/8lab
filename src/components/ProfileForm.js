import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
const ProfileForm = ({ user, onSubmit, onCancel }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user?.name || '',
            email: user?.email || ''
        }
    });

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: 300,
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h5" component="h2">
                Редактировать профиль
            </Typography>

            <TextField
                label="Имя"
                variant="outlined"
                {...register("name", { required: "Введите имя" })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
                fullWidth
            />

            <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                {...register("email", {
                    required: "Введите email",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Некорректный email"
                    }
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                    Сохранить
                </Button>
                <Button type="button" variant="outlined" color="secondary" onClick={onCancel}>
                    Отмена
                </Button>
            </Box>
        </Box>
    );
};

export default ProfileForm;