
import { useState } from "react";
import "./Colleges.css";

const collegeData = [
  {
    id: 1,
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi",
    state: "Delhi",
    courses: ["Computer Science", "Engineering", "AI & ML"],
    type: "Public",
    description:
      "A leading engineering institute offering undergraduate and postgraduate technical programs.",
    website: "https://home.iitd.ac.in/",
  },
  {
    id: 2,
    name: "GLA University",
    location: "Mathura",
    state: "Uttar Pradesh",
    courses: ["Computer Science", "Engineering", "AI & ML", "Business"],
    type: "Private",
    description:
      "A university offering engineering, management, and other professional programs.",
    website: "https://www.gla.ac.in/",
  },
  {
    id: 3,
    name: "Indian Institute of Technology Kanpur",
    location: "Kanpur",
    state: "Uttar Pradesh",
    courses: ["Computer Science", "Engineering", "AI & ML"],
    type: "Public",
    description:
      "An engineering and research institute with a wide range of technical programs.",
    website: "https://www.iitk.ac.in/",
  },
  {
    id: 4,
    name: "Delhi University",
    location: "New Delhi",
    state: "Delhi",
    courses: ["Computer Science", "Business", "Arts"],
    type: "Public",
    description:
      "A university offering undergraduate and postgraduate programs across multiple disciplines.",
    website: "https://www.du.ac.in/",
  },
  {
    id: 5,
    name: "Amity University Noida",
    location: "Noida",
    state: "Uttar Pradesh",
    courses: ["Computer Science", "Engineering", "AI & ML", "Business"],
    type: "Private",
    description:
      "A private university offering programs across technology, management, and other fields.",
    website: "https://www.amity.edu/",
  },
  {
    id: 6,
    name: "Indian Institute of Technology Bombay",
    location: "Mumbai",
    state: "Maharashtra",
    courses: ["Computer Science", "Engineering", "AI & ML"],
    type: "Public",
    description:
      "An engineering and research institute offering a broad range of technical programs.",
    website: "https://www.iitb.ac.in/",
  },
];

function Colleges({ onBack }) {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedCollege, setSelectedCollege] = useState(null);

  const states = [...new Set(collegeData.map((college) => college.state))];

  const courses = [
    ...new Set(collegeData.flatMap((college) => college.courses)),
  ];

  const filteredColleges = collegeData.filter((college) => {
    const matchesSearch =
      college.name.toLowerCase().includes(search.toLowerCase()) ||
      college.location.toLowerCase().includes(search.toLowerCase());

    const matchesState =
      selectedState === "All" || college.state === selectedState;

    const matchesCourse =
      selectedCourse === "All" ||
      college.courses.includes(selectedCourse);

    return matchesSearch && matchesState && matchesCourse;
  });

  if (selectedCollege) {
    return (
      <main className="colleges-page">
        <button
          className="college-back-button"
          onClick={() => setSelectedCollege(null)}
        >
          ← Back to colleges
        </button>

        <section className="college-detail">
          <span className="college-type">{selectedCollege.type}</span>
          <h1>{selectedCollege.name}</h1>
          <p className="college-location">
            {selectedCollege.location}, {selectedCollege.state}
          </p>

          <h3>About this college</h3>
          <p>{selectedCollege.description}</p>

          <h3>Courses available in this demo</h3>
          <div className="college-tags">
            {selectedCollege.courses.map((course) => (
              <span key={course}>{course}</span>
            ))}
          </div>

          <a
            className="college-website-button"
            href={selectedCollege.website}
            target="_blank"
            rel="noreferrer"
          >
            Visit official website ↗
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="colleges-page">
      <header className="colleges-header">
        <button className="college-back-button" onClick={onBack}>
          ← Back to Home
        </button>

        <span className="colleges-eyebrow">FIND YOUR FUTURE</span>
        <h1>Discover Your College</h1>
        <p>
          Explore colleges, compare courses, and find a place to begin your
          journey.
        </p>
      </header>

      <section className="college-filters">
        <input
          type="text"
          placeholder="Search by college name or city..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={selectedState}
          onChange={(event) => setSelectedState(event.target.value)}
        >
          <option value="All">All states</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          value={selectedCourse}
          onChange={(event) => setSelectedCourse(event.target.value)}
        >
          <option value="All">All courses</option>
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </section>

      <p className="college-results">
        {filteredColleges.length} colleges found
      </p>

      <section className="college-grid">
        {filteredColleges.length > 0 ? (
          filteredColleges.map((college) => (
            <article className="college-card" key={college.id}>
              <div className="college-card-top">
                <span className="college-type">{college.type}</span>
                <span className="college-state">{college.state}</span>
              </div>

              <h2>{college.name}</h2>
              <p className="college-location">📍 {college.location}</p>
              <p className="college-description">{college.description}</p>

              <div className="college-tags">
                {college.courses.slice(0, 3).map((course) => (
                  <span key={course}>{course}</span>
                ))}
              </div>

              <button
                className="college-details-button"
                onClick={() => setSelectedCollege(college)}
              >
                View Details →
              </button>
            </article>
          ))
        ) : (
          <div className="college-empty">
            <h2>No colleges found</h2>
            <p>Try another search or change your filters.</p>
            <button
              className="college-details-button"
              onClick={() => {
                setSearch("");
                setSelectedState("All");
                setSelectedCourse("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Colleges;
