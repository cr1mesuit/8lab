import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import useLoginState from '../hooks/useLoginState';
import ProfileForm from '../components/ProfileForm';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const { isLoggedIn, user, login, logout, register, updateProfile } = useLoginState();

    const handleLogin = async (data) => {
        const result = await login(data.username, data.password);
        if (!result.success) {
            alert(result.message);
        }
    };

    const handleRegister = async (data) => {
        const result = await register(data.username, data.password, data.name, data.email);
        if (!result.success) {
            alert(result.message);
        }
    };

    const handleProfileUpdate = async (data) => {
        const result = await updateProfile(user.id, data.name, data.email);
        if (result.success) {
            setIsEditingProfile(false);
        } else {
            alert(result.message);
        }
    };

    if (isLoggedIn) {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                <h2>Добро пожаловать, {user.name}!</h2>
                <p>Email: {user.email}</p>

                {isEditingProfile ? (
                    <ProfileForm
                        user={user}
                        onSubmit={handleProfileUpdate}
                        onCancel={() => setIsEditingProfile(false)}
                    />
                ) : (
                    <>
                        <button onClick={() => window.location.reload()}>Войти</button>
                        <button onClick={() => setIsEditingProfile(true)}>Редактировать профиль</button>
                        <button onClick={logout}>Выйти</button>
                    </>
                )}
            </div>
        );
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
            {isLogin ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                    <LoginForm onSubmit={handleLogin} />
                    <button onClick={() => setIsLogin(false)}>Нет аккаунта? Зарегистрироваться</button>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                    <RegisterForm onSubmit={handleRegister} />
                    <button onClick={() => setIsLogin(true)}>Уже есть аккаунт? Войти</button>
                </div>
            )}
        </div>
    );
};

export default AuthPage;