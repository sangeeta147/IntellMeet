
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Meetings from "./pages/Meetings";
import Tasks from "./pages/Tasks";
import WorkSpace from "./pages/WorkSpace";
import Signup from "./pages/Signup";
import Settings from "./pages/Settings";

function App() {
  useEffect(() => {
  try {
    const savedSettings = localStorage.getItem("intellmeet_settings");

    if (savedSettings) {
      const settings = JSON.parse(savedSettings);

      if (settings.theme === "dark" || settings.theme === "light") {
        document.documentElement.dataset.theme = settings.theme;
      }
    }
  } catch {
    document.documentElement.dataset.theme = "light";
  }
}, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/workspace" element={<WorkSpace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;