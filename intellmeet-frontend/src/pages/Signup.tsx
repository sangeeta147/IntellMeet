
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!name.trim()) {
      setIsError(true);
      setMessage("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setIsError(true);
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setIsError(true);
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match.");
      return;
    }

    setIsError(true);
    setMessage(
      "Your details passed frontend validation, but Signup is not connected to the server yet. No account has been created."
    );
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <Link to="/" className="login-brand">
          IntellMeet<span>.</span>
        </Link>

        <p className="login-eyebrow">GET STARTED</p>
        <h1>Create your account</h1>
        <p className="login-description">
          Join your team and collaborate with IntellMeet.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setMessage("");
            }}
            maxLength={100}
            required
          />

          <label htmlFor="signup-email">Email address</label>
          <input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setMessage("");
            }}
            required
          />

          <label htmlFor="signup-password">Password</label>
          <div className="password-field">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setMessage("");
              }}
              minLength={8}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label htmlFor="confirm-password">Confirm password</label>
          <div className="password-field">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setMessage("");
              }}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowConfirmPassword((current) => !current)
              }
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          {message && (
            <p
              className="login-error"
              role="alert"
              style={{ color: isError ? "#c0392b" : "#218653" }}
            >
              {message}
            </p>
          )}

          <button type="submit" className="login-button">
            Create Account
          </button>
        </form>

        <p className="login-footer">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>

        <p className="auth-notice">
          Account creation is not connected to the backend yet.
        </p>
      </section>
    </main>
  );
}

export default Signup;
