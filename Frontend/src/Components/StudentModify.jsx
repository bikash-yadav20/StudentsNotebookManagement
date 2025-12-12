import React, { useContext } from "react";
import { StudentsContext } from "../../context/StudentsContext";

const StudentModify = () => {
  const { activeEdit, setActiveEdit } = useContext(StudentsContext);

  const handlePromote = async () => {
    const hardPassword = "PromoteKaizen!";
    const userConfirmed = window.confirm(
      "Are you sure you want to promote all students to the next class? This action cannot be undone."
    );
    if (!userConfirmed) return;
    const inputPassword = window.prompt("Enter the promotion password:");
    if (inputPassword !== hardPassword) {
      alert("Incorrect password. Promotion aborted.");
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/promote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldSession: "2027-28", //will make this dynamic letter
          newSession: "2028-29",
        }),
      });
      const data = await res.json();
      alert(data.message || "Promotion complete!");
    } catch (err) {
      alert("Promotion failed: " + err.message);
    }
  };

  return (
    <div className="mt-5">
      <h1 className="text-4xl font-bold">School Control</h1>
      <div className="flex flex-row mt-5 justify-between">
        <div className="flex flex-col bg-gray-300 ">
          <button
            onClick={() => setActiveEdit(true)}
            className="bg-blue-600 text-white p-2 w-64 rounded cursor-pointer"
          >
            Edit Data
          </button>
          <p>Edit students roll no. name and class</p>
        </div>
        <div className="flex flex-col bg-gray-300 ">
          <button
            onClick={handlePromote}
            className="bg-green-600 text-white p-2 rounded cursor-pointer"
          >
            Promote
          </button>
          <p>Promote students to upper class</p>
        </div>
        <div className="flex flex-col bg-yellow-300 ">
          <button className="bg-gray-600 text-white p-2 rounded cursor-pointer">
            Test Case
          </button>
          <p>This button does nothing </p>
        </div>
      </div>
    </div>
  );
};

export default StudentModify;
