import { useState, useEffect } from "react";

const useLoginState = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn);
        localStorage.setItem("user", JSON.stringify(user));
    }, [isLoggedIn, user]);

    const login = async (username, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                setUser(data.user);
                setIsLoggedIn(true);
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Login failed' };
            }
        } catch (error) {
            return { success: false, message: 'Network error' };
        }
    };

    const register = async (username, password, name, email) => {
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, name, email }),
            });

            const data = await response.json();

            if (data.success) {
                setUser(data.user);
                setIsLoggedIn(true);
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Registration failed' };
            }
        } catch (error) {
            return { success: false, message: 'Network error' };
        }
    };

    const updateProfile = async (userId, name, email) => {
        try {
            const response = await fetch(`http://localhost:5000/api/profile/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });

            const data = await response.json();

            if (data.success) {
                setUser(data.user);
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Update failed' };
            }
        } catch (error) {
            return { success: false, message: 'Network error' };
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload()
    };

    return { isLoggedIn, user, login, logout, register, updateProfile };
};

export default useLoginState;