import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Header from "./Header";

export default function Timesheet() {
  const navigate = useNavigate();
  const [timesheetData, setTimesheetData] = useState([
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: "",
    hours: "",
    project: "",
    task: "",
  });

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleAddTimesheet = () => {
    if (!newEntry.date || !newEntry.hours || !newEntry.project || !newEntry.task) {
      alert("Please fill in all fields");
      return;
    }

    const hours = parseInt(newEntry.hours);
    
    if (hours < 1 || hours > 24) {
      alert("Hours must be between 1 and 24");
      return;
    }

    setTimesheetData([...timesheetData, newEntry]);
    setNewEntry({ date: "", hours: "", project: "", task: "" });
    setShowForm(false);
    alert("Timesheet entry added successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Restrict hours input to maximum 24
    if (name === "hours") {
      if (value > 24) {
        return; // Prevent input if greater than 24
      }
    }

    setNewEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitTimesheet = () => {
    if (timesheetData.length === 0) {
      alert("Please add at least one timesheet entry before submitting");
      return;
    }

    alert("Timesheet submitted successfully!");
    // Add your submit logic here (e.g., send to backend)
    console.log("Submitted timesheet:", timesheetData);
    setTimesheetData([]);
  };

  const totalHours = timesheetData.reduce((sum, item) => sum + parseInt(item.hours) || 0, 0);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">Workspace</h2>
        <ul>
          <li
            onClick={() => handleNavigation("/dashboard")}
            title="Home"
            className="sidebar-icon"
          >
             Home
          </li>
          <li
            onClick={() => handleNavigation("/projects")}
            title="Projects"
            className="sidebar-icon"
          >
             Projects
          </li>
          <li
            onClick={() => handleNavigation("/timesheet")}
            title="Timesheet"
            className="sidebar-icon"
          >
             Timesheet
          </li>
          <li
            onClick={() => handleNavigation("/analytics")}
            title="Analytics"
            className="sidebar-icon"
          >
             Analytics
          </li>
          <li
            onClick={() => handleNavigation("/settings")}
            title="Settings"
            className="sidebar-icon"
          >
             Settings
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main">
        <Header isLogin={true} showSearch={false} />
        {/* <h1>📅 Timesheet</h1> */}

        <div className="cards">
          <div className="card">
            <h3>Total Hours This Week</h3>
            <p>
              <b>{totalHours}</b> hours
            </p>
          </div>
          <div className="card">
            <h3>Average</h3>
            <p>
              <b>{(totalHours / 5).toFixed(1)}</b> hours/day
            </p>
          </div>
        </div>

        <div className="content">
          <div className="projects">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3>Weekly Timesheet</h3>
              <button
                onClick={() => setShowForm(!showForm)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                {showForm ? "Cancel" : "+ Mark Timesheet"}
              </button>
            </div>

            {showForm && (
              <div style={{
                backgroundColor: "#f9f9f9",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "20px",
                border: "1px solid #ddd",
              }}>
                <h4>Fill Timesheet</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div>
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      value={newEntry.date}
                      onChange={handleInputChange}
                      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  </div>
                  <div>
                    <label>Hours (Max 24)</label>
                    <input
                      type="number"
                      name="hours"
                      value={newEntry.hours}
                      onChange={handleInputChange}
                      placeholder="Enter hours (1-24)"
                      min="1"
                      max="24"
                      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  </div>
                  <div>
                    <label>Project</label>
                    <input
                      type="text"
                      name="project"
                      value={newEntry.project}
                      onChange={handleInputChange}
                      placeholder="Enter project name"
                      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  </div>
                  <div>
                    <label>Task</label>
                    <input
                      type="text"
                      name="task"
                      value={newEntry.task}
                      onChange={handleInputChange}
                      placeholder="Enter task"
                      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddTimesheet}
                  style={{
                    marginTop: "15px",
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Save Entry
                </button>
              </div>
            )}

            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Project</th>
                  <th>Task</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                {timesheetData.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>{entry.project}</td>
                    <td>{entry.task}</td>
                    <td>
                      <b>{entry.hours}h</b>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {timesheetData.length > 0 && (
              <button
                onClick={handleSubmitTimesheet}
                style={{
                  marginTop: "20px",
                  padding: "12px 30px",
                  backgroundColor: "#ff9800",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Submit Timesheet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}