
import { useState } from "react";
import "./Courses.css";

const courseData = [
  {
    id: 1,
    title: "Python Programming",
    category: "Programming",
    level: "Beginner",
    duration: "6–8 weeks",
    skills: ["Python basics", "Functions", "OOP"],
    description: "Learn programming fundamentals and build a foundation for software development.",
    url: "https://docs.python.org/3/tutorial/",
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    category: "Data & AI",
    level: "Intermediate",
    duration: "8–10 weeks",
    skills: ["Python", "Scikit-learn", "Model evaluation"],
    description: "Explore datasets, train ML models, and understand model evaluation.",
    url: "https://scikit-learn.org/stable/getting_started.html",
  },
  {
    id: 3,
    title: "Generative AI and LLMs",
    category: "Data & AI",
    level: "Intermediate",
    duration: "6–8 weeks",
    skills: ["Transformers", "Prompting", "LLM APIs"],
    description: "Understand large language models and learn how to build AI-powered applications.",
    url: "https://huggingface.co/learn",
  },
  {
    id: 4,
    title: "Web Development",
    category: "Web Development",
    level: "Beginner",
    duration: "8–12 weeks",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    description: "Build responsive websites and interactive interfaces with modern web technologies.",
    url: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
  },
  {
    id: 5,
    title: "SQL and Database Fundamentals",
    category: "Data & AI",
    level: "Beginner",
    duration: "4–6 weeks",
    skills: ["SQL", "Queries", "Database design"],
    description: "Learn how to query, organize, and work with relational databases.",
    url: "https://www.postgresql.org/docs/current/tutorial.html",
  },
  {
    id: 6,
    title: "UI/UX Design Fundamentals",
    category: "Design",
    level: "Beginner",
    duration: "4–6 weeks",
    skills: ["Wireframing", "Prototyping", "User research"],
    description: "Learn how to design clear, accessible, user-friendly digital experiences.",
    url: "https://www.figma.com/resource-library/",
  },
];

function Courses({ onBack }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const categories = [...new Set(courseData.map((course) => course.category))];
  const levels = [...new Set(courseData.map((course) => course.level))];

  const filteredCourses = courseData.filter((course) => {
    const text = `${course.title} ${course.description} ${course.skills.join(" ")}`.toLowerCase();

    return (
      text.includes(search.toLowerCase()) &&
      (category === "All" || course.category === category) &&
      (level === "All" || course.level === level)
    );
  });

  if (selectedCourse) {
    return (
      <main className="courses-page">
        <button className="courses-back" onClick={() => setSelectedCourse(null)}>
          ← Back to courses
        </button>

        <section className="course-detail">
          <span className="course-label">{selectedCourse.category}</span>
          <h1>{selectedCourse.title}</h1>
          <p>{selectedCourse.description}</p>

          <p><strong>Level:</strong> {selectedCourse.level}</p>
          <p><strong>Estimated duration:</strong> {selectedCourse.duration}</p>

          <h3>Skills you'll explore</h3>
          <div className="course-tags">
            {selectedCourse.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>

          <a className="course-resource" href={selectedCourse.url} target="_blank" rel="noreferrer">
            Open learning resource ↗
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="courses-page">
      <button className="courses-back" onClick={onBack}>
        ← Back to Home
      </button>

      <header className="courses-header">
        <span className="courses-eyebrow">LEARN. BUILD. GROW.</span>
        <h1>Courses & Skills</h1>
        <p>Discover learning resources and build skills for your next opportunity.</p>
      </header>

      <section className="courses-filters">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search courses or skills..."
          aria-label="Search courses or skills"
        />

        <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category">
          <option value="All">All categories</option>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>

        <select value={level} onChange={(event) => setLevel(event.target.value)} aria-label="Filter by level">
          <option value="All">All levels</option>
          {levels.map((item) => <option key={item}>{item}</option>)}
        </select>
      </section>

      <p className="courses-count">{filteredCourses.length} courses found</p>

      <section className="courses-grid">
        {filteredCourses.length > 0 ? filteredCourses.map((course) => (
          <article className="course-card" key={course.id}>
            <span className="course-label">{course.category}</span>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p className="course-meta">{course.level} · {course.duration}</p>

            <div className="course-tags">
              {course.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>

            <button className="course-open" onClick={() => setSelectedCourse(course)}>
              Explore course →
            </button>
          </article>
        )) : (
          <div className="courses-empty">
            <h2>No matching courses</h2>
            <p>Try another search or clear your filters.</p>
            <button className="course-open" onClick={() => {
              setSearch("");
              setCategory("All");
              setLevel("All");
            }}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Courses;
