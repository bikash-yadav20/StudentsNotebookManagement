import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Students = () => {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeSearch, setActivesearch ] = useState(false)

  const [subjects, setSubjects] = useState([]);
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch classes
  useEffect(() => {
    fetch(`${API_URL}/api/classes`)
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Fetch sections when class changes
  useEffect(() => {
    if (!selectedClass) return;
    fetch(`${API_URL}/api/sections/${selectedClass}`)
      .then((res) => res.json())
      .then((data) => setSections(data))
      .catch((err) => console.error(err));
  }, [selectedClass]);

  // Fetch students when Search is clicked
  const handleSearch = () => {
    if (!selectedClass || !selectedSection || !selectedSession) return;
    fetch(
      `${API_URL}/api/students/${selectedClass}/${selectedSection}?session=${selectedSession}`
    )
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err))
      setActivesearch(true);
  };

  // Handle Check button for a student
  const handleCheck = async (student) => {
    setSelectedStudent(student);

    try {
      const subRes = await fetch(`${API_URL}/api/subjects/${student.class}`);
      const subjectsArray = await subRes.json();

      const checksRes = await fetch(
        `${API_URL}/api/student/${student._id}/notebookChecks`
      );
      const savedChecks = checksRes.ok ? await checksRes.json() : [];

      const merged = subjectsArray.map((subj) => {
        const saved = savedChecks.find((s) => s.subject === subj);
        return {
          subject: subj,
          checks: saved ? saved.checks : Array(6).fill(false),
          remark: saved ? saved.remark : "",
          date: saved ? saved.date : null,
        };
      });

      setSubjects(merged);
      setActiveSubjectIndex(null); // start with subject list view
    } catch (err) {
      console.error("Error in handleCheck:", err);
    }
  };

  // Handle Submit for active subject
  const handleSubmit = async () => {
    try {
      const activeSubject = subjects[activeSubjectIndex];

      const payload = {
        subject: activeSubject.subject,
        checks: activeSubject.checks,
        remark: activeSubject.remark,
        date: new Date().toISOString(),
      };

      const res = await fetch(
        `${API_URL}/api/student/${selectedStudent._id}/notebookChecks`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload), // send only one subject
        }
      );

      if (!res.ok) throw new Error("Failed to save notebook checks");
      await res.json();

      alert("Notebook check saved!");
      setActiveSubjectIndex(null); // go back to subject list
    } catch (err) {
      console.error(err);
      alert("Error saving notebook checks");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Select Class</h2>
      <div className="sm:flex flex-row gap-6">
        {/* Class Dropdown */}
        <select
          className="text-black border rounded-md px-3 py-2"
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            setSelectedSection("");
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
          className="text-black border rounded-md px-3 py-2"
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

        {/* Session Dropdown */}
        <select
          className="text-black border rounded-md px-3 py-2"
          value={selectedSession}
          onChange={(e) => setSelectedSession(e.target.value)}
        >
          <option value="">Session</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-800 rounded text-white w-32"
        >
          Search
        </button>
        {( activeSearch &&
        <div className="flex items-center space-x-2 bg-gray-100  rounded-lg shadow-md w-full max-w-md">
          <input
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Search
          </button>
        </div>
        )}
      </div>

      <div className="mt-6">
        {/* Student list */}
       {!selectedStudent && students.length > 0 && (
  <ul className="space-y-2">
    {students.filter(stu =>
  (stu.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (stu.roll?.toString().includes(searchTerm))
)

      .map(stu => (
        <li
          key={stu._id}
          className="flex justify-between bg-blue-200 px-4 py-4 rounded"
        >
          <span>{stu.roll}</span>
          <span>{stu.name}</span>
          <button
            onClick={() => handleCheck(stu)}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Check
          </button>
        </li>
      ))}
  </ul>
)}


        {/* Subject list */}
        {selectedStudent && activeSubjectIndex === null && (
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">
              {selectedStudent.name} ({selectedStudent.class})
            </h3>
            {subjects.map((item, idx) => (
              <div
                key={item.subject}
                className="flex justify-between items-center mb-2"
              >
                <span>{item.subject}</span>
                <button
                  onClick={() => setActiveSubjectIndex(idx)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Check
                </button>
              </div>
            ))}
            <button
              onClick={() => setSelectedStudent(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Students
            </button>
          </div>
        )}

        {/* Active subject checklist */}
        {selectedStudent && activeSubjectIndex !== null && (
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h4 className="font-medium">
              {subjects[activeSubjectIndex].subject}
            </h4>
            <p className="text-sm text-gray-500">
              {subjects[activeSubjectIndex].date
                ? `Last updated: ${new Date(
                    subjects[activeSubjectIndex].date
                  ).toLocaleDateString()}`
                : "Not yet checked"}
            </p>
            <div className="flex gap-2 mb-2">
              {subjects[activeSubjectIndex].checks.map(
                (checked, checkIndex) => (
                  <label key={checkIndex} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        const updated = [...subjects];
                        updated[activeSubjectIndex].checks[checkIndex] =
                          !updated[activeSubjectIndex].checks[checkIndex];
                        setSubjects(updated);
                      }}
                    />
                    Check {checkIndex + 1}
                  </label>
                )
              )}
            </div>
            <input
              type="text"
              placeholder="Enter remark"
              value={subjects[activeSubjectIndex].remark}
              onChange={(e) => {
                const updated = [...subjects];
                updated[activeSubjectIndex].remark = e.target.value;
                setSubjects(updated);
              }}
              className="border px-2 py-1 rounded w-full"
            />

            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={() => setActiveSubjectIndex(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Back to Subjects
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
