import React, { createContext, useState, useEffect } from "react";

// Создаем контекст
export const ThemeContext = createContext();

// Провайдер темы
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.body.style.background = theme === "light" ? "white" : "#333333";
        document.body.style.color = theme === "light" ? "black" : "white";
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};