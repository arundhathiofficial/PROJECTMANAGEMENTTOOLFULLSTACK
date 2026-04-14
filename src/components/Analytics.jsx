import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Header from "./Header";

export default function Analytics() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
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
        <Header isLogin={true} showSearch={false} />
        {/* <h1>📊 Analytics & Reports</h1> */}

        <div className="cards">
          <div className="card">
            <h3>Project Completion</h3>
            <p>
              <b>72%</b> Overall
            </p>
          </div>
          <div className="card">
            <h3>Team Productivity</h3>
            <p>
              <b>8.5</b> hrs/day avg
            </p>
          </div>
          <div className="card">
            <h3>Active Tasks</h3>
            <p>
              <b>24</b> In Progress
            </p>
          </div>
        </div>

        <div className="content">
          <div className="projects">
            <h3>Project Performance</h3>
            <table>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Completion</th>
                  <th>On Schedule</th>
                  <th>Team Size</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Website Redesign</td>
                  <td>65%</td>
                  <td>Yes</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>Marketing Campaign</td>
                  <td>40%</td>
                  <td>No</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>Product Launch</td>
                  <td>20%</td>
                  <td>Yes</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>App Development</td>
                  <td>100%</td>
                  <td>Yes</td>
                  <td>6</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="activity">
            <h3>Performance Metrics</h3>
            <ul>
              <li>📈 Team Efficiency: +12% this month</li>
              <li>✓ Completed Tasks: 145</li>
              <li>⏰ Avg Task Duration: 2.5 days</li>
              <li>👥 Team Capacity: 85% utilized</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
