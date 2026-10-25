
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "./services/api";

const Lobby = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mode = searchParams.get("mode") || "join";
  const isCreateMode = mode === "create";

  const [meetingId, setMeetingId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateMeeting = async () => {
    if (!title.trim()) {
      setError("Please enter a meeting title.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/meetings", {
        title: title.trim(),
        description: description.trim(),
      });

      const meeting = response.data?.meeting;

      if (!meeting?._id) {
        setError("Meeting was created, but no meeting ID was returned.");
        return;
      }

      // Use the database ID because the existing meeting route
      // is /meeting/:id.
      navigate(`/meeting/${meeting._id}`);
    } catch (err) {
      console.error("Create meeting error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to create meeting. Please check your login and backend."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleJoinMeeting = () => {
    const id = meetingId.trim();

    if (!id) {
      setError("Please enter a Meeting ID.");
      return;
    }

    setError("");
    navigate(`/meeting/${encodeURIComponent(id)}`);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="bg-[#1e293b] p-8 sm:p-10 rounded-3xl w-full max-w-[562px]">
        <h1 className="text-3xl text-white mb-8 text-center">
          {isCreateMode ? "Create Meeting" : "Join Meeting"}
        </h1>

        {isCreateMode ? (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter meeting title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              className="w-full p-4 rounded-xl bg-[#0f172a] text-white border border-slate-700 outline-none focus:border-blue-500"
            />

            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-4 rounded-xl bg-[#0f172a] text-white border border-slate-700 outline-none focus:border-blue-500 resize-none"
            />

            <button
              onClick={handleCreateMeeting}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 py-4 rounded-xl text-white font-bold transition cursor-pointer"
            >
              {loading ? "Creating Meeting..." : "Create Meeting"}
            </button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Enter Meeting ID"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleJoinMeeting();
              }}
              className="w-full p-4 rounded-xl bg-[#0f172a] text-white border border-slate-700 outline-none focus:border-blue-500"
            />

            <button
              onClick={handleJoinMeeting}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 py-4 rounded-xl text-white font-bold transition cursor-pointer"
            >
              Join Now
            </button>
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Lobby;
