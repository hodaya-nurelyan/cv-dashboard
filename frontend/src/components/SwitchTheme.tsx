import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";


export function SwitchTheme() {

    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <div className="switch-wrapper">
            <div className="sun"></div>
            <div className="toggle-wrapper">
                <input
                    id="switch"
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                ></input>
                <label for="switch" id="toggle">Toggle</label>
            </div>
            <div className="moon"></div>
        </div>
    )
}

