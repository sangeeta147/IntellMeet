
import axios from "axios";

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        return "Your session may have expired. Please log in again.";
      }

      if (status === 403) {
        return "You do not have permission to perform this action.";
      }

      if (status >= 500) {
        return "Something went wrong on the server. Please try again later.";
      }

      return "The request failed. Please check your information and try again.";
    }

    if (error.request) {
      return "Unable to connect to the server. Please try again.";
    }

    return "The request could not be prepared. Please try again.";
  }

  return "An unexpected error occurred. Please try again.";
}
