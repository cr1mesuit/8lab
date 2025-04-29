import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
            <h2>Авторизация</h2>
            <input
                type="text"
                placeholder="Логин"
                {...register("username", { required: "Введите логин" })}
            />
            {errors.username && <span style={{ color: "red" }}>{errors.username.message}</span>}

            <input
                type="password"
                placeholder="Пароль"
                {...register("password", { required: "Введите пароль" })}
            />
            {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}

            <button type="submit">Войти</button>
        </form>
    );
};

export default LoginForm;
