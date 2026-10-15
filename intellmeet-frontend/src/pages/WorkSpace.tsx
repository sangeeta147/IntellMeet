
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import "./Dashboard.css";

const teamMembers = [
  {
    name: "Sangeeta",
    role: "Frontend Developer",
    initials: "S",
  },
  {
    name: "Team Member 2",
    role: "Backend Developer",
    initials: "T2",
  },
  {
    name: "Team Member 3",
    role: "UI/UX Designer",
    initials: "T3",
  },
  {
    name: "Team Member 4",
    role: "Project Coordinator",
    initials: "T4",
  },
];

function WorkSpace() {
  return (
    <DashboardLayout>
      {/* Page header */}
      <header className="topbar">
        <div>
          <p className="page-label">WORKSPACE / TEAM</p>
          <h1>Workspace</h1>
        </div>

        <div className="profile">
          <div className="profile-avatar">S</div>
          <div>
            <strong>Team Member</strong>
            <small>IntellMeet Workspace</small>
          </div>
        </div>
      </header>

      {/* Welcome section */}
      <section className="welcome-section">
        <div>
          <p className="eyebrow">YOUR TEAM SPACE</p>
          <h2>Everything your team needs to collaborate.</h2>
          <p className="welcome-text">
            Keep meetings, tasks, and team updates organized in one place.
          </p>
        </div>

        <div className="welcome-icon">✦</div>
      </section>

      {/* Workspace overview */}
      <section className="quick-actions">
        <Link to="/meetings" className="action-card">
          <span className="action-icon">▦</span>
          <span>
            <strong>Meetings</strong>
            <small>Review team conversations</small>
          </span>
        </Link>

        <Link to="/tasks" className="action-card">
          <span className="action-icon">✓</span>
          <span>
            <strong>Tasks</strong>
            <small>Track action items</small>
          </span>
        </Link>

        <Link to="/" className="action-card">
          <span className="action-icon">◎</span>
          <span>
            <strong>Dashboard</strong>
            <small>View your workspace overview</small>
          </span>
        </Link>
      </section>

      {/* Team members */}
      <section className="meeting-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WORKING TOGETHER</p>
            <h2>Team Members</h2>
          </div>

          <span className="view-label">
            {teamMembers.length} members
          </span>
        </div>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <article className="team-card" key={member.initials}>
              <div className="team-avatar">{member.initials}</div>

              <div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>

              <span className="team-member-status">
                Workspace member
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* Collaboration panel */}
      <section className="bottom-panel">
        <div>
          <p className="eyebrow">SMART COLLABORATION</p>
          <h2>Better teamwork starts here.</h2>
          <p>
            Use your shared workspace to organize discussions and
            keep project work moving forward. Team invitations and
            shared data can be connected when the backend is ready.
          </p>
        </div>

        <span className="intelligence-icon">✧</span>
      </section>
    </DashboardLayout>
  );
}

export default WorkSpace;
