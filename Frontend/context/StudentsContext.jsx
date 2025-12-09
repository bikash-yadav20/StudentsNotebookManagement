import { createContext, useEffect, useState } from "react";

export const StudentsContext = createContext();

const StudentProvider = ({ children }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentetials, setCredentials] = useState(null);

  useEffect(() => {
    const storedCreds = localStorage.getItem("credentials")
    if(storedCreds){
      setCredentials(JSON.parse(storedCreds));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (creds) => {
    setCredentials(creds);
    setIsLoggedIn(true);
    localStorage.setItem("credentials", JSON.stringify(creds));
  }

  const logout =() => {
    setCredentials(null);
    setIsLoggedIn(false);
    localStorage.removeItem("credentials");
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

export default StudentProvider;
