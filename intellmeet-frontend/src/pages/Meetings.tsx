
import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import type { Meeting } from "../types/meeting";
import { getMeetings, saveMeetings } from "../utils/meetingStorage";
import "./Dashboard.css";

function Meetings() {
  const [meetings, setMeetings] = useState<Meeting[]>(getMeetings);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    saveMeetings(meetings);
  }, [meetings]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newMeeting: Meeting = {
      id: crypto.randomUUID(),
      title: title.trim(),
      date,
      time,
    };

    setMeetings((currentMeetings) =>
      [...currentMeetings, newMeeting].sort(
        (a, b) =>
          new Date(`${a.date}T${a.time}`).getTime() -
          new Date(`${b.date}T${b.time}`).getTime()
      )
    );

    setTitle("");
    setDate("");
    setTime("");
    setMessage("Meeting added successfully.");
  }

  function handleDelete(id: string) {
    setMeetings((currentMeetings) =>
      currentMeetings.filter((meeting) => meeting.id !== id)
    );
    setMessage("Meeting deleted.");
  }

  return (
    <DashboardLayout>
      <header className="topbar">
        <div>
          <p className="page-label">WORKSPACE / MEETINGS</p>
          <h1>Meetings</h1>
        </div>
      </header>

      <section className="welcome-section">
        <div>
          <p className="eyebrow">MEETING MANAGEMENT</p>
          <h2>Bring your team together.</h2>
          <p className="welcome-text">
            Create and manage your upcoming meetings.
          </p>
        </div>
        <div className="welcome-icon">✦</div>
      </section>

      <section className="meeting-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PLAN AHEAD</p>
            <h2>Create a Meeting</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="meeting-form">
          <label htmlFor="meeting-title">Meeting title</label>
          <input
            id="meeting-title"
            type="text"
            placeholder="e.g. Project Planning"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={100}
            required
          />

          <div className="meeting-form-row">
            <div>
              <label htmlFor="meeting-date">Date</label>
              <input
                id="meeting-date"
                type="date"
                value={date}
                min={new Date().toLocaleDateString("en-CA")}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="meeting-time">Time</label>
              <input
                id="meeting-time"
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="meeting-submit">
            + Create Meeting
          </button>

          {message && <p role="status">{message}</p>}
        </form>
      </section>

      <section className="meeting-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR SCHEDULE</p>
            <h2>All Meetings</h2>
          </div>
          <span className="view-label">
            {meetings.length} {meetings.length === 1 ? "meeting" : "meetings"}
          </span>
        </div>

        <div className="meeting-list">
          {meetings.length === 0 ? (
            <p>No meetings yet. Create your first meeting above.</p>
          ) : (
            meetings.map((meeting) => (
              <article className="meeting-card" key={meeting.id}>
                <div className="meeting-date">
                  <strong>{meeting.date.slice(8, 10)}</strong>
                  <span>
                    {new Date(`${meeting.date}T12:00:00`)
                      .toLocaleString("en", { month: "short" })
                      .toUpperCase()}
                  </span>
                </div>

                <div className="meeting-details">
                  <h3>{meeting.title}</h3>
                  <p>
                    {new Date(`${meeting.date}T12:00:00`).toLocaleDateString(
                      "en-IN",
                      { day: "numeric", month: "short", year: "numeric" }
                    )}{" "}
                    · {meeting.time}
                  </p>
                </div>

                <button
                  type="button"
                  className="meeting-delete"
                  onClick={() => handleDelete(meeting.id)}
                  aria-label={`Delete ${meeting.title}`}
                >
                  Delete
                </button>
              </article>
            ))
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Meetings;
