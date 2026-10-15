
import { create } from "zustand";
import type { Meeting } from "../types/meeting";

type MeetingState = {
  meetings: Meeting[];
  setMeetings: (meetings: Meeting[]) => void;
  addMeeting: (meeting: Meeting) => void;
  deleteMeeting: (id: string) => void;
};

const useMeetingStore = create<MeetingState>((set) => ({
  meetings: [],

  setMeetings: (meetings) => {
    set({ meetings });
  },

  addMeeting: (meeting) => {
    set((state) => ({
      meetings: [...state.meetings, meeting],
    }));
  },

  deleteMeeting: (id) => {
    set((state) => ({
      meetings: state.meetings.filter(
        (meeting) => meeting.id !== id
      ),
    }));
  },
}));

export default useMeetingStore;
