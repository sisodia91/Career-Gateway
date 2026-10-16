
import { useState } from "react";
import "./StudentProfile.css";

const initialForm = {
  full_name: "",
  education_level: "",
  interests: "",
  skills: "",
  career_goals: "",
  preferred_location: "",
};

export default function StudentProfile({ onBack }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError(false);

    try {
      const response = await fetch(
        "https://career-gateway-1l27.onrender.com/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const detail =
          typeof data.detail === "string"
            ? data.detail
            : Array.isArray(data.detail)
              ? data.detail.map((item) => item.msg).join(", ")
              : "Could not save your profile.";

        throw new Error(detail);
      }

      setMessage(
        `Profile saved successfully! Student ID: ${data.id}`
      );
      setForm(initialForm);
    } catch (err) {
      setError(true);
      setMessage(
        typeof err.message === "string"
          ? err.message
          : "Could not connect to Career Gateway."
      );
    } finally {
      setLoading(false);
    }
  }


  return (
    <main className="student-profile-page">
      <div className="student-profile-card">
        <button className="profile-back" onClick={onBack} type="button">
          ← Back
        </button>

        <p className="profile-eyebrow">YOUR CAREER JOURNEY</p>
        <h1>Build Your Student Profile</h1>
        <p className="profile-description">
          Tell us about yourself so Career Gateway can help you explore
          careers that match your interests and goals.
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </label>

          <label>
            Education Level
            <select
              name="education_level"
              value={form.education_level}
              onChange={handleChange}
            >
              <option value="">Select education level</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 12">Class 12</option>
              <option value="Diploma">Diploma</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            Interests
            <textarea
              name="interests"
              value={form.interests}
              onChange={handleChange}
              placeholder="e.g. AI, design, business, healthcare"
              rows="3"
            />
          </label>

          <label>
            Current Skills
            <textarea
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="e.g. Python, communication, problem-solving"
              rows="3"
            />
          </label>

          <label>
            Career Goals
            <textarea
              name="career_goals"
              value={form.career_goals}
              onChange={handleChange}
              placeholder="What would you like to pursue?"
              rows="3"
            />
          </label>

          <label>
            Preferred Location
            <input
              name="preferred_location"
              value={form.preferred_location}
              onChange={handleChange}
              placeholder="e.g. Delhi, Uttar Pradesh, Anywhere in India"
            />
          </label>

          <button className="profile-submit" type="submit" disabled={loading}>
            {loading ? "Saving Profile..." : "Save My Profile"}
          </button>

          {message && (
            <p className={error ? "profile-error" : "profile-success"}>
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
