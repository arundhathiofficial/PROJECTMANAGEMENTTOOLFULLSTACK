import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";
import Header from "./Header";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { userId, email } = location.state || { userId: null, email: null };

  const [selectedProject, setSelectedProject] = useState(null);

  // Sample projects data
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      status: "In Progress",
      dueDate: "May 15, 2022",
      description: "Complete redesign of company website with modern UI/UX",
      team: "Sarah L., John D.",
      progress: "65%",
    },
    {
      id: 2,
      name: "Marketing Campaign",
      status: "On Hold",
      dueDate: "June 10, 2022",
      description: "Q2 marketing campaign strategy and execution",
      team: "Emily R., Michael T.",
      progress: "40%",
    },
    {
      id: 3,
      name: "Product Launch",
      status: "Planning",
      dueDate: "July 5, 2022",
      description: "Launch new product line with full market analysis",
      team: "Sarah L., Emily R.",
      progress: "20%",
    },
    {
      id: 4,
      name: "App Development",
      status: "Completed",
      dueDate: "April 20, 2022",
      description: "Mobile app development for iOS and Android",
      team: "John D., Michael T.",
      progress: "100%",
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

  const handleSearchFromHeader = (searchResults) => {
    if (searchResults.length === 1) {
      handleProjectClick(searchResults[0]);
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
        <Header isLogin={true} logedUser={userId} projects={projects} onProjectSelect={handleProjectClick} />

        {/* Cards */}
        <div className="cards">
          <div className="card orange">
            <h3>Tasks Due</h3>
            <p>
              <b>8</b> Overdue
            </p>
            <p>
              <b>12</b> Upcoming
            </p>
          </div>

          <div className="card blue">
            <h3>Team Availability</h3>
            <p>
              <b>5</b> Online
            </p>
            <p>
              <b>3</b> On Leave
            </p>
          </div>

          <div className="card green">
            <h3>Progress</h3>
            <p>
              <b>72%</b> On Track
            </p>
          </div>

          <div className="card purple">
            <h3>Time Tracking</h3>
            <p>
              <b>18h</b> Logged
            </p>
            <p>
              <b>4h</b> This Week
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="content">
          {/* Projects */}
          <div className="projects">
            <h3>Current Projects</h3>
            <table>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{project.name}</td>
                    <td>
                      <span className={`status ${project.status.toLowerCase().replace(" ", "-")}`}>
                        {project.status}
                      </span>
                    </td>
                    <td>{project.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Team Activity */}
          <div className="activity">
            <h3>Team Activity</h3>
            <ul>
              <li>Sarah L. - Working on Landing Page</li>
              <li>John D. - Updated Marketing Plan</li>
              <li>Emily R. - Design Review</li>
              <li>Michael T. - Offline</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottom">
          <div className="tasks">
            <h3>My Tasks</h3>
            <ul>
              <li>Finish Draft Presentation</li>
              <li>Follow up with Client</li>
              <li>Review Design Mockups</li>
              <li>Schedule Team Meeting</li>
            </ul>
          </div>

          <div className="milestones">
            <h3>Upcoming Milestones</h3>
            <ul>
              <li>Beta Release - May 20</li>
              <li>Campaign Launch - June 5</li>
              <li>Q3 Planning - June 25</li>
            </ul>
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
            <h2>{selectedProject.name}</h2>
            <div className="popup-body">
              <p>
                <b>Description:</b> {selectedProject.description}
              </p>
              <p>
                <b>Status:</b>{" "}
                <span className={`status ${selectedProject.status.toLowerCase().replace(" ", "-")}`}>
                  {selectedProject.status}
                </span>
              </p>
              <p>
                <b>Progress:</b> {selectedProject.progress}
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