
import type { Meeting } from "../types/meeting";

const STORAGE_KEY = "intellmeet_meetings";

export function getMeetings(): Meeting[] {
  try {
    const savedMeetings = localStorage.getItem(STORAGE_KEY);

    if (!savedMeetings) {
      return [];
    }

    const parsedMeetings: unknown = JSON.parse(savedMeetings);

    if (!Array.isArray(parsedMeetings)) {
      return [];
    }

    return parsedMeetings;
  } catch {
    return [];
  }
}

export function saveMeetings(meetings: Meeting[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
}
