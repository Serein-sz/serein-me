import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useRef } from "react";

export function ModeToggle() {
  const darkModeRef = useRef<boolean>(true);
  const { setTheme } = useTheme();
  function toggleMode() {
    setTheme(darkModeRef.current ? "light" : "dark");
    darkModeRef.current = !darkModeRef.current;
    console.log(darkModeRef.current);
  }
  return (
    <div>
      <Button variant="ghost" size="icon" onClick={toggleMode}>
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
