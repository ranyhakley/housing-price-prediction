"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./Icons/MoonIcon";
import { SunIcon } from "./Icons/SunIcon";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <Switch
        checked={theme === "dark"} // Ensures the switch reflects the correct theme
        size="lg"
        color="success"
        onChange={handleTheme} // Use onChange instead of onClick for Switch
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
      />
    </div>
  );
};

export default ThemeSwitcher;