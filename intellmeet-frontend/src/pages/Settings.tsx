
import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import "./Settings.css";

type SettingsData = {
  displayName: string;
  email: string;
  meetingReminders: boolean;
  taskNotifications: boolean;
  workspaceNotifications: boolean;
  theme: "light" | "dark";
};

const defaultSettings: SettingsData = {
  displayName: "",
  email: "",
  meetingReminders: true,
  taskNotifications: true,
  workspaceNotifications: false,
  theme: "light",
};

const STORAGE_KEY = "intellmeet_settings";

function Settings() {
  const [settings, setSettings] =
    useState<SettingsData>(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed: unknown = JSON.parse(stored);

        if (
          typeof parsed === "object" &&
          parsed !== null &&
          "displayName" in parsed &&
          "email" in parsed &&
          "meetingReminders" in parsed &&
          "taskNotifications" in parsed &&
          "workspaceNotifications" in parsed &&
          "theme" in parsed
        ) {
          setSettings({
            ...defaultSettings,
            ...(parsed as SettingsData),
          });
        }
      }
    } catch {
      // Use defaults if saved settings cannot be read.
    }
  }, []);

  
function updateSetting<K extends keyof SettingsData>(
  key: K,
  value: SettingsData[K]
) {
  setSettings((current) => ({
    ...current,
    [key]: value,
  }));

  if (key === "theme") {
    document.documentElement.dataset.theme = value as string;
  }

  setSaved(false);
}

  function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(settings)
      );
      setSaved(true);
    } catch {
      setSaved(false);
      window.alert("Unable to save settings in this browser.");
    }
  }

  return (
    <DashboardLayout>
      <div className="settings-page">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account and application preferences.</p>
        </div>

        <form onSubmit={saveSettings}>
          <section className="settings-card">
            <h2>Profile Settings</h2>
            <p className="settings-description">
              Customize your display information.
            </p>

            <label className="settings-label" htmlFor="displayName">
              Display name
            </label>
            <input
              id="displayName"
              className="settings-input"
              value={settings.displayName}
              onChange={(event) =>
                updateSetting("displayName", event.target.value)
              }
              placeholder="Enter your name"
            />

            <label className="settings-label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              className="settings-input"
              type="email"
              value={settings.email}
              onChange={(event) =>
                updateSetting("email", event.target.value)
              }
              placeholder="you@example.com"
            />
          </section>

          <section className="settings-card">
            <h2>Notifications</h2>
            <p className="settings-description">
              Choose which reminders you prefer.
            </p>

            <label className="settings-option">
              <span>Meeting reminders</span>
              <input
                type="checkbox"
                checked={settings.meetingReminders}
                onChange={(event) =>
                  updateSetting("meetingReminders", event.target.checked)
                }
              />
            </label>

            <label className="settings-option">
              <span>Task notifications</span>
              <input
                type="checkbox"
                checked={settings.taskNotifications}
                onChange={(event) =>
                  updateSetting("taskNotifications", event.target.checked)
                }
              />
            </label>

            <label className="settings-option">
              <span>Workspace notifications</span>
              <input
                type="checkbox"
                checked={settings.workspaceNotifications}
                onChange={(event) =>
                  updateSetting(
                    "workspaceNotifications",
                    event.target.checked
                  )
                }
              />
            </label>
          </section>

          <section className="settings-card">
            <h2>Appearance</h2>
            <p className="settings-description">
              Choose your preferred appearance.
            </p>

            <label className="settings-label" htmlFor="theme">
              Theme
            </label>
            <select
              id="theme"
              className="settings-input"
              value={settings.theme}
              onChange={(event) =>
                updateSetting(
                  "theme",
                  event.target.value as SettingsData["theme"]
                )
              }
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
            <p className="settings-description">
              Theme selection is saved, but does not yet change the
              appearance of the whole application.
            </p>
          </section>

          <div className="settings-actions">
            <button type="submit" className="settings-save-button">
              Save Settings
            </button>
            {saved && (
              <p className="settings-success" role="status">
                Settings saved successfully!
              </p>
            )}
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default Settings;
