import { useState, useEffect } from "react";
import iconMoon from "../../assets/icon-moon.svg";
import iconSun from "../../assets/icon-sun.svg";

const ThemeToggleComponent = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]); // Se ejecutará cada vez que `theme` cambie

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <img
        className="cursor-pointer w-8"
        onClick={toggleTheme}
        src={theme === "light" ? iconMoon : iconSun}
        alt="Toggle theme"
      />
    </>
  );
};

export default ThemeToggleComponent;
