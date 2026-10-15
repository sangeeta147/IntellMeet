
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import type { Meeting } from "../types/meeting";
import { getMeetings } from "../utils/meetingStorage";
import "./Dashboard.css";

function Dashboard() {
  const meetings: Meeting[] = getMeetings();

  const upcomingMeetings = meetings
    .filter((meeting) => {
      const meetingTime = new Date(
        `${meeting.date}T${meeting.time}`
      ).getTime();

      return meetingTime >= Date.now();
    })
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}`).getTime() -
        new Date(`${b.date}T${b.time}`).getTime()
    );

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="topbar">
        <div>
          <p className="page-label">OVERVIEW / DASHBOARD</p>
          <h1>Dashboard</h1>
        </div>

        <div className="profile">
          <div className="profile-avatar">S</div>
          <div>
            <strong>Welcome back!</strong>
            <small>Team Member</small>
          </div>
        </div>
      </header>

      {/* Welcome section */}
      <section className="welcome-section">
        <div>
          <p className="eyebrow">YOUR WORKSPACE</p>
          <h2>Make every meeting count.</h2>
          <p className="welcome-text">
            Manage meetings, organize tasks, and collaborate with
            your team — all in one place.
          </p>
        </div>

        <div className="welcome-icon">✦</div>
      </section>

      {/* Quick actions */}
      <section className="quick-actions">
        <Link to="/meetings" className="action-card">
          <span className="action-icon">▦</span>
          <span>
            <strong>Schedule a Meeting</strong>
            <small>Plan your next team discussion</small>
          </span>
        </Link>

        <Link to="/tasks" className="action-card">
          <span className="action-icon">✓</span>
          <span>
            <strong>Manage Tasks</strong>
            <small>Keep track of your action items</small>
          </span>
        </Link>

        <Link to="/workspace" className="action-card">
          <span className="action-icon">◎</span>
          <span>
            <strong>Team Workspace</strong>
            <small>Stay connected with your team</small>
          </span>
        </Link>
      </section>

      {/* Upcoming meetings */}
      <section className="meeting-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR SCHEDULE</p>
            <h2>Upcoming Meetings</h2>
          </div>

          <span className="view-label">
            {upcomingMeetings.length} scheduled
          </span>
        </div>

        <div className="meeting-list">
          {upcomingMeetings.length === 0 ? (
            <p>
              No upcoming meetings. Create one from the Meetings page.
            </p>
          ) : (
            upcomingMeetings.map((meeting) => {
              const meetingDate = new Date(
                `${meeting.date}T12:00:00`
              );

              return (
                <article
                  className="meeting-card"
                  key={meeting.id}
                >
                  <div className="meeting-date">
                    <strong>{meetingDate.getDate()}</strong>
                    <span>
                      {meetingDate
                        .toLocaleString("en", {
                          month: "short",
                        })
                        .toUpperCase()}
                    </span>
                  </div>

                  <div className="meeting-details">
                    <h3>{meeting.title}</h3>
                    <p>
                      {meetingDate.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      · {meeting.time}
                    </p>
                  </div>

                  <span className="meeting-status">Upcoming</span>
                </article>
              );
            })
          )}
        </div>
      </section>

      {/* Bottom information panel */}
      <section className="bottom-panel">
        <div>
          <p className="eyebrow">SMART COLLABORATION</p>
          <h2>Work smarter with IntellMeet.</h2>
          <p>
            Bring your conversations, meeting notes, and team
            action items together as the platform evolves.
          </p>
        </div>

        <span className="intelligence-icon">✧</span>
      </section>
    </DashboardLayout>
  );
}

export default Dashboard;
