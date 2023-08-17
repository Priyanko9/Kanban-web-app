import { createContext, useState } from "react";
import {} from "react-beautiful-dnd";
import "./App.css";
import Dashboard from "./Dashboard";
import Theme from "./Theme";
import { BoardProvider } from "./BoardContext";

interface ThemeContextType {
  currentTheme: string;
  setCurrentTheme:Function;
  theme:typeof Theme;
}

export const ThemeContext = createContext<ThemeContextType| null>(null);

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
