import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Header from "./Header";

export default function Projects() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsData = [
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
  ];

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
            🏠
          </li>
          <li
            onClick={() => handleNavigation("/projects")}
            title="Projects"
            className="sidebar-icon"
          >
            📁
          </li>
          <li
            onClick={() => handleNavigation("/timesheet")}
            title="Timesheet"
            className="sidebar-icon"
          >
            📅
          </li>
          <li
            onClick={() => handleNavigation("/analytics")}
            title="Analytics"
            className="sidebar-icon"
          >
            📊
          </li>
          <li
            onClick={() => handleNavigation("/settings")}
            title="Settings"
            className="sidebar-icon"
          >
            ⚙️
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
            <h3>📁 All Projects</h3>
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

      {/* Project Popup */}
      {selectedProject && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>
              ✕
            </button>
            <h2>📁 {selectedProject.name}</h2>
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