// StudentsContext.jsx
import { createContext, useState } from "react";

export const StudentsContext = createContext();

const StudentProvider = ({ children }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentetials, setCredentials] = useState(null);

  const login = (creds) => {
    setCredentials(creds);
    setIsLoggedIn(true);
  }

  const logout =() => {
    setCredentials(null);
    setIsLoggedIn(false);
  }

  return (
    <StudentsContext.Provider
      value={{ selectedStudent, setSelectedStudent, reportData, setReportData, 
        isLoggedIn, setIsLoggedIn, credentetials, setCredentials, login, logout }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentProvider;   // ✅ default export
