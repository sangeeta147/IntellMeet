
import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import "./Dashboard.css";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
};

const STORAGE_KEY = "intellmeet_tasks";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Prepare project requirements",
    description: "Review the IntellMeet project scope",
    priority: "High",
    completed: false,
  },
  {
    id: "2",
    title: "Review meeting notes",
    description: "Organize notes from the team discussion",
    priority: "Medium",
    completed: false,
  },
  {
    id: "3",
    title: "Set up the frontend",
    description: "Create the initial React application",
    priority: "Low",
    completed: true,
  },
];

function loadTasks(): Task[] {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (savedTasks === null) {
      return initialTasks;
    }

    const parsedTasks: unknown = JSON.parse(savedTasks);

    if (!Array.isArray(parsedTasks)) {
      return initialTasks;
    }

    return parsedTasks as Task[];
  } catch {
    return initialTasks;
  }
}

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("Medium");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.length - completedCount;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setMessage("Task added successfully.");
  }

  function handleToggle(id: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );

    setMessage("Task status updated.");
  }

  function handleDelete(id: string) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );

    setMessage("Task deleted.");
  }

  return (
    <DashboardLayout>
      <header className="topbar">
        <div>
          <p className="page-label">WORKSPACE / TASKS</p>
          <h1>Tasks</h1>
        </div>

        <div className="profile">
          <div className="profile-avatar">S</div>
          <div>
            <strong>Team Member</strong>
            <small>IntellMeet Workspace</small>
          </div>
        </div>
      </header>

      <section className="welcome-section">
        <div>
          <p className="eyebrow">TASK MANAGEMENT</p>
          <h2>Turn conversations into action.</h2>
          <p className="welcome-text">
            Organize your work, track progress, and stay on top
            of your team's action items.
          </p>
        </div>

        <div className="welcome-icon">✓</div>
      </section>

      {/* Task statistics */}
      <section className="quick-actions">
        <article className="action-card">
          <span className="action-icon">◷</span>
          <span>
            <strong>{tasks.length} Total Tasks</strong>
            <small>Across your workspace</small>
          </span>
        </article>

        <article className="action-card">
          <span className="action-icon">✓</span>
          <span>
            <strong>{completedCount} Completed</strong>
            <small>Keep up the good work</small>
          </span>
        </article>

        <article className="action-card">
          <span className="action-icon">◎</span>
          <span>
            <strong>{pendingCount} Pending</strong>
            <small>Ready for your attention</small>
          </span>
        </article>
      </section>

      {/* Add task form */}
      <section className="meeting-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PLAN YOUR WORK</p>
            <h2>Add a New Task</h2>
          </div>
        </div>

        <form className="meeting-form" onSubmit={handleSubmit}>
          <label htmlFor="task-title">Task title</label>
          <input
            id="task-title"
            type="text"
            placeholder="e.g. Build the login page"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={100}
            required
          />

          <label htmlFor="task-description">
            Description (optional)
          </label>
          <input
            id="task-description"
            type="text"
            placeholder="Add a few details"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={250}
          />

          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as Task["priority"])
            }
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button type="submit" className="meeting-submit">
            + Add Task
          </button>

          {message && <p role="status">{message}</p>}
        </form>
      </section>

      {/* Task list */}
      <section className="meeting-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR WORK</p>
            <h2>Task List</h2>
          </div>

          <span className="view-label">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        <div className="meeting-list">
          {tasks.length === 0 ? (
            <p>No tasks yet. Add your first task above.</p>
          ) : (
            tasks.map((task) => (
              <article className="meeting-card" key={task.id}>
                <div className="meeting-date">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggle(task.id)}
                    aria-label={`Mark ${task.title} as ${
                      task.completed ? "pending" : "completed"
                    }`}
                  />
                  <span>{task.priority.toUpperCase()}</span>
                </div>

                <div className="meeting-details">
                  <h3
                    style={{
                      textDecoration: task.completed
                        ? "line-through"
                        : "none",
                      opacity: task.completed ? 0.6 : 1,
                    }}
                  >
                    {task.title}
                  </h3>

                  <p>
                    {task.description || "No description provided"}
                  </p>
                </div>

                <span className="meeting-status">
                  {task.completed ? "Completed" : "Pending"}
                </span>

                <button
                  type="button"
                  className="meeting-delete"
                  onClick={() => handleDelete(task.id)}
                  aria-label={`Delete ${task.title}`}
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

export default Tasks;
