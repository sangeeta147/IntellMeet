
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./services/api";
import {
  Bell,
  Video,
  Users,
  Clock,
  BookOpen,
  CheckSquare,
  Plus,
  LogOut,
  ChevronRight,
  User,
  AlertCircle,
  Calendar,
  Layers,
  X,
  MessageSquare,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();

  const [meetings, setMeetings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [taskConversion, setTaskConversion] = useState(null);

  const [assigneeId, setAssigneeId] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [taskStatus, setTaskStatus] = useState("todo");
  const [taskDescription, setTaskDescription] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const meetingsRes = await api.get("/meetings");
      if (meetingsRes.data?.success) {
        setMeetings(meetingsRes.data.meetings || []);
      }

      const notificationsRes = await api.get("/notifications");
      if (notificationsRes.data?.success) {
        setNotifications(notificationsRes.data.notifications || []);
      }

      const usersRes = await api.get("/users");
      if (usersRes.data?.success) {
        setUsers(usersRes.data.users || []);
      }
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
      toast.error(
        "Dashboard load failed: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const markNotificationRead = async (id) => {
    try {
      const res = await api.put(`/notifications/${id}`);

      if (res.data?.success) {
        setNotifications((prev) =>
          prev.filter((notification) => notification._id !== id)
        );
        toast.success("Notification marked as read");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update notification");
    }
  };

  const convertToTask = async (e) => {
    e.preventDefault();
    if (!taskConversion) return;

    try {
      const taskData = {
        title: taskConversion.text,
        description:
          taskDescription ||
          `Action item from meeting: "${taskConversion.text}"`,
        status: taskStatus,
        priority: taskPriority,
        assignee: assigneeId || null,
        meetingId: taskConversion.meetingId,
      };

      const res = await api.post("/tasks", taskData);

      if (res.data?.success) {
        toast.success("Task created on Kanban board successfully!");
        setTaskConversion(null);
        setAssigneeId("");
        setTaskPriority("medium");
        setTaskStatus("todo");
        setTaskDescription("");
      }
    } catch (err) {
      console.error("Task creation error:", err);
      toast.error(
        err.response?.data?.message || "Failed to create task"
      );
    }
  };

  const calculateMetrics = () => {
    const totalCalls = meetings.length;
    let totalMinutes = 0;
    const participantsSet = new Set();

    meetings.forEach((meeting) => {
      if (meeting.startTime && meeting.endTime) {
        const difference =
          new Date(meeting.endTime) - new Date(meeting.startTime);

        totalMinutes += Math.max(0, Math.round(difference / 60000));
      }

      (meeting.participants || []).forEach((participant) => {
        participantsSet.add(
          participant?._id || participant
        );
      });

      (meeting.participantDetails || []).forEach((participant) => {
        if (participant.user) {
          participantsSet.add(participant.user);
        }
      });
    });

    return {
      totalCalls,
      totalDuration: `${totalMinutes} mins`,
      uniqueParticipants: participantsSet.size,
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[#f1f5f9] font-sans pb-16">
      <ToastContainer position="top-right" theme="dark" />

      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 bg-[#0f172a]/90 backdrop-blur-md border-b border-[#1e293b] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center">
            <Video className="w-5 h-5 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              IntellMeet AI
            </h1>
            <p className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">
              Intelligence & Collaboration
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/project")}
            className="flex items-center gap-2 px-4 py-2 bg-[#1e293b] hover:bg-[#334155] border border-[#334155] rounded-xl text-sm"
          >
            <Layers className="w-4 h-4 text-indigo-400" />
            Project Board
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="p-2.5 bg-[#1e293b] hover:bg-[#334155] border border-[#334155] rounded-xl relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-slate-300" />

              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-[#151c2c] border border-[#1e293b] rounded-2xl shadow-2xl p-4 z-50">
                <div className="flex justify-between border-b border-[#1e293b] pb-2 mb-3">
                  <h3 className="font-semibold text-sm">
                    Notifications
                  </h3>
                  <span className="text-xs text-indigo-400">
                    {notifications.length} Unread
                  </span>
                </div>

                {notifications.length === 0 ? (
                  <p className="py-6 text-center text-slate-500 text-xs">
                    No new notifications.
                  </p>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification._id}
                        className="p-3 bg-[#1e293b]/50 rounded-xl"
                      >
                        <div className="flex gap-2">
                          <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                          <p className="text-xs text-slate-300">
                            {notification.message}
                          </p>
                        </div>

                        <div className="flex justify-between items-center mt-3">
                          <span className="text-[10px] text-slate-500">
                            {notification.createdAt
                              ? new Date(
                                  notification.createdAt
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : ""}
                          </span>

                          <button
                            onClick={() =>
                              markNotificationRead(notification._id)
                            }
                            className="text-xs text-indigo-400"
                          >
                            Mark Read
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="p-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-rose-400 rounded-xl"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-8">
        {/* WELCOME SECTION */}
        <section className="bg-gradient-to-r from-[#151c2c] to-[#111827] border border-[#1e293b] rounded-3xl p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
          <div>
            <h2 className="text-3xl font-extrabold text-white">
              Welcome to IntellMeet Space
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl text-sm leading-relaxed">
              Launch video meetings, collaborate with your team,
              and manage meeting reports and action items.
            </p>
          </div>

          {/* SEPARATE MEETING BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => navigate("/lobby?mode=create")}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 transition cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Create Meeting
            </button>

            <button
              onClick={() => navigate("/lobby?mode=join")}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-[#1e293b] hover:bg-[#334155] border border-[#334155] text-white font-bold rounded-2xl transition cursor-pointer"
            >
              <Video className="w-5 h-5" />
              Join Meeting
            </button>
          </div>
        </section>

        {/* METRICS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#151c2c] border border-[#1e293b] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 text-xs uppercase">
                Total Meetings
              </span>
              <Video className="w-5 h-5 text-indigo-400" />
            </div>
            <p className="text-3xl font-extrabold">
              {metrics.totalCalls}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Total recorded sessions
            </p>
          </div>

          <div className="bg-[#151c2c] border border-[#1e293b] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 text-xs uppercase">
                Total Duration
              </span>
              <Clock className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-extrabold">
              {metrics.totalDuration}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Total recorded meeting time
            </p>
          </div>

          <div className="bg-[#151c2c] border border-[#1e293b] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 text-xs uppercase">
                Unique Collaborators
              </span>
              <Users className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-3xl font-extrabold">
              {metrics.uniqueParticipants}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Unique participants recorded
            </p>
          </div>
        </section>

        {/* MEETING HISTORY */}
        <section>
          <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            Session History & AI Reports
          </h3>

          {loading ? (
            <div className="bg-[#151c2c] border border-[#1e293b] rounded-2xl p-12 text-center text-slate-400">
              Loading meeting history...
            </div>
          ) : meetings.length === 0 ? (
            <div className="bg-[#151c2c] border border-[#1e293b] rounded-2xl p-12 text-center text-slate-400">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              No past sessions recorded. Start or join a meeting to begin.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {meetings.map((meeting) => (
                <div
                  key={meeting._id}
                  onClick={() => setSelectedMeeting(meeting)}
                  className="bg-[#151c2c] hover:bg-[#1e293b] border border-[#1e293b] hover:border-indigo-500/40 rounded-2xl p-5 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg">
                      {meeting.title || "Untitled Meeting"}
                    </h4>
                    <span className="text-xs text-indigo-400 uppercase">
                      {meeting.status || "Recorded"}
                    </span>
                  </div>

                  {meeting.description && (
                    <p className="text-xs text-slate-400 mb-4">
                      {meeting.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {meeting.startTime
                        ? new Date(meeting.startTime).toLocaleDateString()
                        : "Date unavailable"}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {meeting.participants?.length || 0} participants
                    </span>
                  </div>

                  <div className="mt-5 border-t border-[#1e293b] pt-4 flex justify-between items-center">
                    <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1">
                      View AI Analytics
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>

                    {meeting.summary && (
                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <CheckSquare className="w-3 h-3" />
                        AI Synced
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* MEETING REPORT MODAL */}
      {selectedMeeting && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-[#111827] border border-[#1e293b] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col">
            <div className="bg-[#151c2c] px-6 py-4 border-b border-[#1e293b] flex justify-between items-center">
              <div>
                <span className="text-[10px] text-indigo-400 font-bold uppercase">
                  AI MEETING REPORT
                </span>
                <h3 className="text-xl font-bold mt-1">
                  {selectedMeeting.title || "Meeting Report"}
                </h3>
              </div>

              <button
                onClick={() => setSelectedMeeting(null)}
                className="p-2 hover:bg-[#1e293b] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-5">
                <h4 className="font-bold text-sm text-indigo-300 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  AI Summary
                </h4>
                <p className="text-sm text-slate-300 whitespace-pre-line">
                  {selectedMeeting.summary ||
                    "No summary was generated for this meeting."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#151c2c] border border-[#1e293b] rounded-2xl p-5">
                  <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-indigo-400" />
                    Discussion Transcript
                  </h4>
                  <div className="text-xs text-slate-400 whitespace-pre-line">
                    {selectedMeeting.transcript ||
                      "No transcript data available."}
                  </div>
                </div>

                <div className="bg-[#151c2c] border border-[#1e293b] rounded-2xl p-5">
                  <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-indigo-400" />
                    Extracted Action Items
                  </h4>

                  <div className="space-y-3">
                    {!selectedMeeting.actionItems?.length ? (
                      <p className="text-xs text-slate-500">
                        No action items detected.
                      </p>
                    ) : (
                      selectedMeeting.actionItems.map((item, index) => (
                        <div
                          key={index}
                          className="p-3 bg-[#0b0f19] border border-[#1e293b] rounded-xl"
                        >
                          <p className="text-xs text-slate-200">
                            {item.text}
                          </p>

                          {item.assignee && (
                            <p className="text-[10px] text-slate-500 mt-1">
                              Suggested Assignee: {String(item.assignee).slice(-6)}
                            </p>
                          )}

                          <button
                            onClick={() =>
                              setTaskConversion({
                                text: item.text,
                                meetingId: selectedMeeting._id,
                              })
                            }
                            className="mt-3 text-xs font-bold text-indigo-400"
                          >
                            Convert to Task
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#151c2c] px-6 py-4 border-t border-[#1e293b] flex justify-end">
              <button
                onClick={() => setSelectedMeeting(null)}
                className="px-5 py-2 bg-[#1e293b] hover:bg-[#334155] rounded-xl text-sm"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONVERT ACTION ITEM TO TASK */}
      {taskConversion && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <div className="bg-[#111827] border border-[#1e293b] w-full max-w-md rounded-2xl p-6 relative">
            <button
              onClick={() => setTaskConversion(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h4 className="text-lg font-bold mb-1">
              Create Kanban Task
            </h4>

            <p className="text-xs text-indigo-400 mb-4">
              Converting: {taskConversion.text}
            </p>

            <form onSubmit={convertToTask} className="space-y-4">
              <div>
                <label className="block text-xs mb-1.5">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  value={taskConversion.text}
                  onChange={(e) =>
                    setTaskConversion({
                      ...taskConversion,
                      text: e.target.value,
                    })
                  }
                  className="w-full bg-[#0b0f19] border border-[#1e293b] rounded-xl p-3 text-xs outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs mb-1.5">
                  Description / Notes
                </label>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Provide additional context..."
                  className="w-full bg-[#0b0f19] border border-[#1e293b] rounded-xl p-3 text-xs outline-none focus:border-indigo-500 h-20 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1.5">
                    Priority
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                    className="w-full bg-[#0b0f19] border border-[#1e293b] rounded-xl p-3 text-xs"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs mb-1.5">
                    Initial Column
                  </label>
                  <select
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                    className="w-full bg-[#0b0f19] border border-[#1e293b] rounded-xl p-3 text-xs"
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs mb-1.5">
                  Assignee
                </label>
                <select
                  value={assigneeId}
                  onChange={(e) => setAssigneeId(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-[#1e293b] rounded-xl p-3 text-xs"
                >
                  <option value="">Unassigned</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setTaskConversion(null)}
                  className="flex-1 py-3 bg-[#1e293b] rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl text-xs font-bold"
                >
                  Sync to Kanban
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
