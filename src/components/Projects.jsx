import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Header from "./Header";

export default function Projects() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [projectsData, setProjectsData] = useState([
    {
      id: 1,
      name: "Website Redesign",
      status: "In Progress",
      progress: "65%",
      dueDate: "May 15, 2022",
      description: "Complete redesign of company website with modern UI/UX",
      team: "Sarah L., John D.",
    },
    {
      id: 2,
      name: "Marketing Campaign",
      status: "On Hold",
      progress: "40%",
      dueDate: "June 10, 2022",
      description: "Q2 marketing campaign strategy and execution",
      team: "Emily R., Michael T.",
    },
    {
      id: 3,
      name: "Product Launch",
      status: "Planning",
      progress: "20%",
      dueDate: "July 5, 2022",
      description: "Launch new product line with full market analysis",
      team: "Sarah L., Emily R.",
    },
    {
      id: 4,
      name: "App Development",
      status: "Completed",
      progress: "100%",
      dueDate: "April 20, 2022",
      description: "Mobile app development for iOS and Android",
      team: "John D., Michael T.",
    },
  ]);

  const [newProject, setNewProject] = useState({
    name: "",
    status: "Planning",
    progress: "0%",
    dueDate: "",
    description: "",
    team: "",
  });

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closePopup = () => {
    setSelectedProject(null);
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(" ", "-");
  };

  const handleAddProjectClick = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setNewProject({
      name: "",
      status: "Planning",
      progress: "0%",
      dueDate: "",
      description: "",
      team: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitProject = (e) => {
    e.preventDefault();
    if (newProject.name && newProject.dueDate) {
      const project = {
        id: projectsData.length + 1,
        ...newProject,
      };
      setProjectsData((prev) => [...prev, project]);
      handleCloseForm();
    } else {
      alert("Please fill in all required fields");
    }
  };

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
        <Header 
          isLogin={true} 
          projects={projectsData} 
          onProjectSelect={handleProjectClick}
        />

        <div className="content">
          <div className="projects">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3> All Projects</h3>
              <button 
                onClick={handleAddProjectClick}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}
              >
                + Add New Project
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {projectsData.map((project) => (
                  <tr
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{project.name}</td>
                    <td>
                      <span className={`status ${getStatusClass(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: project.progress }}
                        ></div>
                      </div>
                      <span className="progress-text">{project.progress}</span>
                    </td>
                    <td>{project.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Project Form Modal */}
      {showAddForm && (
        <div className="popup-overlay" onClick={handleCloseForm}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={handleCloseForm}>
              ✕
            </button>
            <h2>➕ Add New Project</h2>
            <form onSubmit={handleSubmitProject} style={{ padding: "20px" }}>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="name" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Project Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newProject.name}
                  onChange={handleInputChange}
                  placeholder="Enter project name"
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="description" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newProject.description}
                  onChange={handleInputChange}
                  placeholder="Enter project description"
                  rows="3"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="status" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={newProject.status}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }}
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="dueDate" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Due Date *
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={newProject.dueDate}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="team" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Team Members
                </label>
                <input
                  type="text"
                  id="team"
                  name="team"
                  value={newProject.team}
                  onChange={handleInputChange}
                  placeholder="e.g., John D., Sarah L."
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "bold"
                  }}
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Popup */}
      {selectedProject && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>
              ✕
            </button>
            <h2>📋 {selectedProject.name}</h2>
            <div className="popup-body">
              <p>
                <b>Description:</b> {selectedProject.description}
              </p>
              <p>
                <b>Status:</b>{" "}
                <span className={`status ${getStatusClass(selectedProject.status)}`}>
                  {selectedProject.status}
                </span>
              </p>
              <p>
                <b>Progress:</b>
                <div className="progress-bar-large">
                  <div
                    className="progress-fill"
                    style={{ width: selectedProject.progress }}
                  ></div>
                </div>
                <span className="progress-text">{selectedProject.progress}</span>
              </p>
              <p>
                <b>Due Date:</b> {selectedProject.dueDate}
              </p>
              <p>
                <b>Team Members:</b> {selectedProject.team}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}