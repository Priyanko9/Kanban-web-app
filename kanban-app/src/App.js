import { createContext, useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import Theme from "./Theme";
import { BoardProvider } from "./BoardContext";

export const ThemeContext = createContext();

function App() {
  const [currentTheme, setCurrentTheme] = useState("lightTheme");

  return (
    <ThemeContext.Provider
      value={{ currentTheme, setCurrentTheme, theme: Theme }}
    >
      <BoardProvider>
        <Dashboard />
      </BoardProvider>
    </ThemeContext.Provider>
  );
}

export default App;
