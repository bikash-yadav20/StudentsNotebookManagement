import React, { useContext } from "react";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CheckNotebooks from "./Pages/CheckNotebooks";
import Reports from "./Pages/Reports";
import StudentProvider, { StudentsContext } from "../context/StudentsContext";
import LoginForm from "./Pages/LoginForm";
import Students from "./Pages/Students"

const AppContent = () => {
  const { isLoggedIn } = useContext(StudentsContext);

  if (!isLoggedIn) {
    // ✅ Block entire app until login
    return <LoginForm />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/check-notebook" element={<CheckNotebooks />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/students" element={<Students />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

const App = () => (
  <StudentProvider>
    <AppContent />
  </StudentProvider>
);

export default App;
