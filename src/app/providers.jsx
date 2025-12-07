"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";

import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export default function Providers({ children }) {
  const [theme, setTheme] = useState("dark");

  // Initialize theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </Provider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
