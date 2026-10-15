
import { useState } from "react";
import "./CareerExplore.css";

const careers = [
  {
    title: "Software Developer",
    category: "Technology",
    icon: "💻",
    description:
      "Build websites, applications and software that solve real-world problems.",
    skills: ["Programming", "Problem Solving", "DSA"],
    qualification: "Computer Science or a related field",
  },
  {
    title: "AI Engineer",
    category: "Data & AI",
    icon: "🤖",
    description:
      "Develop intelligent systems using machine learning and generative AI.",
    skills: ["Python", "Machine Learning", "LLMs"],
    qualification: "Computer Science, AI or a related field",
  },
  {
    title: "Data Analyst",
    category: "Data & AI",
    icon: "📊",
    description:
      "Turn raw data into useful insights that help businesses make decisions.",
    skills: ["SQL", "Python", "Data Visualization"],
    qualification: "Any quantitative or relevant degree",
  },
  {
    title: "Cybersecurity Analyst",
    category: "Technology",
    icon: "🔐",
    description:
      "Help protect computer systems, networks and information from threats.",
    skills: ["Networking", "Linux", "Security Fundamentals"],
    qualification: "IT, Computer Science or related studies",
  },
  {
    title: "UI/UX Designer",
    category: "Design",
    icon: "🎨",
    description:
      "Design intuitive digital experiences that are easy and enjoyable to use.",
    skills: ["Wireframing", "Prototyping", "User Research"],
    qualification: "Design, technology or a related field",
  },
  {
    title: "Business Analyst",
    category: "Business",
    icon: "📈",
    description:
      "Understand business needs and help teams make better decisions.",
    skills: ["Communication", "Excel", "Analytical Thinking"],
    qualification: "Business, technology or a related field",
  },
];

const categories = [
  "All",
  "Technology",
  "Data & AI",
  "Design",
  "Business",
];

function CareerExplore({ onBack }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedCareer, setSelectedCareer] = useState(null);

  const filteredCareers = careers.filter((career) => {
    const matchesCategory =
      category === "All" || career.category === category;

    const query = search.toLowerCase();

    const matchesSearch =
      career.title.toLowerCase().includes(query) ||
      career.description.toLowerCase().includes(query) ||
      career.skills.some((skill) =>
        skill.toLowerCase().includes(query)
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="career-explore">
      <header className="explore-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Home
        </button>

        <span className="explore-label">
          CAREER GATEWAY
        </span>
      </header>

      <section className="explore-hero">
        <span className="explore-eyebrow">
          YOUR FUTURE STARTS HERE
        </span>

        <h1>
          Explore careers.
          <br />
          <span>Discover your potential.</span>
        </h1>

        <p>
          Explore different career paths, discover the skills
          you need and find a direction that fits your interests.
        </p>

        <div className="career-search">
          <span>⌕</span>

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search careers or skills..."
            aria-label="Search careers or skills"
          />

          {search && (
            <button onClick={() => setSearch("")}>
              Clear
            </button>
          )}
        </div>
      </section>

      <section className="career-results">
        <div className="results-heading">
          <div>
            <h2>Find your career path</h2>
            <p>
              Explore opportunities across different fields.
            </p>
          </div>

          <span className="career-count">
            {filteredCareers.length} careers
          </span>
        </div>

        <div className="career-filters">
          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item ? "filter active" : "filter"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {selectedCareer ? (
          <article className="career-detail">
            <button
              className="back-button"
              onClick={() => setSelectedCareer(null)}
            >
              ← All careers
            </button>

            <div className="detail-icon">
              {selectedCareer.icon}
            </div>

            <span className="explore-eyebrow">
              {selectedCareer.category}
            </span>

            <h2>{selectedCareer.title}</h2>

            <p>{selectedCareer.description}</p>

            <h3>Skills to develop</h3>

            <div className="skill-list">
              {selectedCareer.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            <h3>Typical qualifications</h3>

            <p>{selectedCareer.qualification}</p>

            <p className="detail-note">
              These are general examples. Actual requirements
              vary by employer and education program.
            </p>
          </article>
        ) : (
          <div className="career-grid">
            {filteredCareers.map((career) => (
              <article className="career-card" key={career.title}>
                <div className="career-card-top">
                  <span className="career-icon">
                    {career.icon}
                  </span>

                  <span className="career-category">
                    {career.category}
                  </span>
                </div>

                <h3>{career.title}</h3>

                <p>{career.description}</p>

                <div className="skill-list">
                  {career.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <button
                  className="career-details-button"
                  onClick={() => setSelectedCareer(career)}
                >
                  Explore career →
                </button>
              </article>
            ))}
          </div>
        )}

        {!selectedCareer && filteredCareers.length === 0 && (
          <div className="no-careers">
            <span>🔎</span>
            <h3>No careers found</h3>
            <p>Try another search term or category.</p>

            <button
              className="career-details-button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Show all careers
            </button>
          </div>
        )}
      </section>

      <footer className="explore-footer">
        Career Gateway · Explore your possibilities.
      </footer>
    </div>
  );
}

export default CareerExplore;
