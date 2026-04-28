import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Header from "./Header";
import Analytics from './Analytics';

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    emailUpdates: true,
    showOnlineStatus: true,
  });

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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
        <Header isLogin={true} showSearch={false} />
        {/* <h1>⚙️ Settings</h1> */}

        <div className="content">
          <div className="projects">
            <h3>Account Settings</h3>
            <div className="settings-form">
              <div className="setting-item">
                <label htmlFor="notifications">
                  Enable Notifications
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={settings.notifications}
                    onChange={() => handleToggle("notifications")}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>

              <div className="setting-item">
                <label htmlFor="darkMode">
                  Dark Mode
                  <input
                    type="checkbox"
                    id="darkMode"
                    checked={settings.darkMode}
                    onChange={() => handleToggle("darkMode")}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>

              <div className="setting-item">
                <label htmlFor="emailUpdates">
                  Email Updates
                  <input
                    type="checkbox"
                    id="emailUpdates"
                    checked={settings.emailUpdates}
                    onChange={() => handleToggle("emailUpdates")}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>

              <div className="setting-item">
                <label htmlFor="onlineStatus">
                  Show Online Status
                  <input
                    type="checkbox"
                    id="onlineStatus"
                    checked={settings.showOnlineStatus}
                    onChange={() => handleToggle("showOnlineStatus")}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="activity">
            <h3>Account Info</h3>
            <ul>
              <li>
                <b>Email:</b> user@company.com
              </li>
              <li>
                <b>Role:</b> Project Manager
              </li>
              <li>
                <b>Department:</b> Operations
              </li>
              <li>
                <b>Joined:</b> January 15, 2022
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
