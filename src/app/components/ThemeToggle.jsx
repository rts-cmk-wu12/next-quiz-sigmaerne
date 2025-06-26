"use client";

import { useEffect, useState } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark = saved === "dark" || (!saved && prefersDark);

    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
    setHasMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", newTheme);
  };

  if (!hasMounted) return null;

  return (
    <div className='absolute top-16 right-16 z-50'>
      <button
        onClick={toggleTheme}
        className='text-3xl transition-colors duration-300'
        aria-label='Toggle Theme'
      >
        {isDark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
      </button>
    </div>
  );
}
