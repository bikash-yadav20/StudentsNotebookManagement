import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { StudentsContext } from "../../context/StudentsContext";

const EditStudentData = () => {
    const {activeEdit, setActiveEdit} = useContext(StudentsContext)
  const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedSession, setSelectedSession] = useState("");
    const [reportData, setReportData] = useState(null);
    const [loadingReport, setLoadingReport] = useState(false);
    const [showReport, setShowReport] = useState(false);
  
    const [selectedSource, setSelectedSource] = useState("");
    const [sessions, setSessions] = useState([]);


  const API_URL = import.meta.env.VITE_API_URL;


   // Load sessions (active + archive)
      useEffect(() => {
        fetch(`${API_URL}/api/sessions`)
          .then((res) => res.json())
          .then((data) => setSessions(data))
          .catch((err) => console.error(err));
      }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/classes?session=${selectedSession}&source=${selectedSource}`)
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [selectedSession]);

  useEffect(() => {
    if (!selectedClass) return;
    fetch(`${API_URL}/api/sections/${selectedClass}?session=${selectedSession}&source=${selectedSource}`)
      .then((res) => res.json())
      .then((data) => setSections(data))
      .catch((err) => console.error(err));
  }, [selectedClass,]);

  const handleSearch = () => {
    if (!selectedClass || !selectedSection || !selectedSession) return;
    fetch(
      `${API_URL}/api/students/${selectedClass}/${selectedSection}?session=${selectedSession}&source=${selectedSource}`
    )
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  };

  

  return (
    <div>
    {activeEdit && (
    <div className="p-6">
      {/* Dropdowns */}
      <h2 className="text-xl font-semibold mb-4">Select Class</h2>
      <div className="sm:flex flex-row gap-6">

         {/* Session Dropdown */}
        <select
          className="text-black border rounded-md px-3 py-2"
          value={selectedSession}
          onChange={(e) => setSelectedSession(e.target.value)}
        >
          <option value="">Select Session</option>
          {sessions.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>
        {/* Class Dropdown */}
        <select
          className="text-black border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            setSelectedSection(""); // reset section when class changes
          }}
        >
          <option value="">-- Choose a class --</option>
          {classes.map((cls, index) => (
            <option key={index} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        {/* Section Dropdown */}
        <select
          className="text-black border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          <option value="">Select section</option>
          {sections.map((sec, index) => (
            <option key={index} value={sec}>
              {sec}
            </option>
          ))}
        </select>

         {/* Source Toggle (active/archive) */}
        <select
          className=" border rounded-md px-3 py-2"
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
        >
          <option className="text-green-500" value="active">Active</option>
          <option className="text-red-600" value="archive">Archive</option>
        </select>
        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-800 rounded hover:bg-blue-600 cursor-pointer text-white w-32"
        >
          Search
        </button>
      </div>
    
      {/* Students List */}
      
        <div className="mt-6">
          {students.length > 0 ? (
            <ul className="space-y-2">
              {students.map((stu) => (
                <li
                  key={stu._id}
                  className="flex flex-row items-center justify-between bg-blue-200 px-4 py-4 rounded"
                >
                  <span>{stu.roll}</span>
                  <span>{stu.name}</span>
                  <button
                    onClick={() => handleViewReport(stu._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    Edit Data
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No students found</p>
          )}
        </div>
      
    </div>
    )}</div>
  );
};

export default EditStudentData;
