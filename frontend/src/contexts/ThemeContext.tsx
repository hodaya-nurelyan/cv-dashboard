
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type ThemeContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved === null ? true : JSON.parse(saved);
    })


    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);


    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}


// הוק מותאם כדי לגשת ל-context
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};