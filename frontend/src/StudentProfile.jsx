
import { useState } from "react";
import "./StudentProfile.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API_URL = "https://career-gateway-1l27.onrender.com";

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

  // Save the ID returned by the backend.
  const [savedStudentId, setSavedStudentId] = useState(null);

  // State for AI career recommendations.
  const [recommendations, setRecommendations] = useState("");
  const [recommendationLoading, setRecommendationLoading] =
    useState(false);
  const [recommendationError, setRecommendationError] =
    useState("");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError(false);
    setSavedStudentId(null);
    setRecommendations("");
    setRecommendationError("");

    try {
      const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

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

      if (data.id == null) {
        throw new Error(
          "The profile response did not include a student ID."
        );
      }

      setSavedStudentId(data.id);
      setMessage(`Profile saved successfully! Student ID: ${data.id}`);
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

  async function handleGetRecommendations() {
    if (savedStudentId == null) return;

    setRecommendationLoading(true);
    setRecommendationError("");
    setRecommendations("");

    try {
      const response = await fetch(
        `${API_URL}/students/${savedStudentId}/recommendations`,
        {
          method: "POST",
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const detail =
          typeof data.detail === "string"
            ? data.detail
            : "Could not generate career recommendations.";

        throw new Error(detail);
      }

      if (!data.recommendations) {
        throw new Error("The AI returned no recommendations. Please try again.");
      }

      setRecommendations(data.recommendations);
    } catch (err) {
      setRecommendationError(
        err.message || "Could not connect to the AI service. Please try again."
      );
    } finally {
      setRecommendationLoading(false);
    }
  }
  function formatRecommendations(text) {
  // Handle Markdown characters that the AI may return escaped.
  return text.replace(/\\([*_#`~])/g, "$1");
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
              required
            />
          </label>

          <label>
            Education Level
            <select
              name="education_level"
              value={form.education_level}
              onChange={handleChange}
              required
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

          <button
            className="profile-submit"
            type="submit"
            disabled={loading || recommendationLoading}
          >
            {loading ? "Saving Profile..." : "Save My Profile"}
          </button>

          {message && (
            <p className={error ? "profile-error" : "profile-success"}>
              {message}
            </p>
          )}
        </form>

        {savedStudentId != null && (
          <section
            className="career-recommendations"
            aria-live="polite"
            style={{ marginTop: "24px" }}
          >
            <h2>Discover Your Career Path</h2>
            <p className="profile-description">
              Your profile is saved! Let AI Guidance suggest career paths
              based on your information.
            </p>

            <button
              className="profile-submit"
              type="button"
              onClick={handleGetRecommendations}
              disabled={recommendationLoading}
            >
              {recommendationLoading
                ? "Finding Your Best Career Paths..."
                : "Get My Career Recommendations"}
            </button>

            {recommendationError && (
              <p className="profile-error" role="alert">
                {recommendationError}
              </p>
            )}

            {recommendations && (
              <div
                className="recommendation-results"
                style={{
                  marginTop: "20px",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid #dbe3ee",
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                  lineHeight: 1.7,
                }}
              >
                <h2>Your AI Career Recommendations</h2>
                <div className="recommendation-markdown">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {formatRecommendations(recommendations)}
                </ReactMarkdown>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
