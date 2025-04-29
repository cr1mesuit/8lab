import React from "react";
import { useForm } from "react-hook-form";

const RegisterForm = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
            <h2>Регистрация</h2>

            <input
                placeholder="Логин"
                {...register("username", {
                    required: "Введите логин",
                    minLength: { value: 3, message: "Минимум 3 символа" }
                })}
            />
            {errors.username && <span style={{ color: "red" }}>{errors.username.message}</span>}

            <input
                type="password"
                placeholder="Пароль"
                {...register("password", {
                    required: "Введите пароль",
                    minLength: { value: 6, message: "Минимум 6 символов" }
                })}
            />
            {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}

            <button type="submit">Зарегистрироваться</button>
        </form>
    );
};

export default RegisterForm;