
import { useState } from "react";
import "./Scholarships.css";

const scholarshipData = [
  {
    id: 1,
    name: "National Scholarship Portal Opportunities",
    provider: "Government of India",
    level: "Undergraduate",
    type: "Government",
    category: "Merit & Need-Based",
    eligibility: [
      "Eligibility depends on the individual scheme.",
      "Academic requirements and family-income limits may apply.",
      "Applicants must meet the scheme's official criteria.",
    ],
    documents: [
      "Academic marksheets",
      "Identity and bank details",
      "Income or category certificate, if required",
    ],
    description:
      "Explore central and other participating scholarship schemes through the official National Scholarship Portal.",
    website: "https://scholarships.gov.in/",
  },
  {
    id: 2,
    name: "Uttar Pradesh Scholarship Schemes",
    provider: "Government of Uttar Pradesh",
    level: "Undergraduate",
    type: "Government",
    category: "State Scholarship",
    eligibility: [
      "Requirements depend on the specific scheme.",
      "Domicile, course, income and academic conditions may apply.",
      "Applicants must follow the current application guidelines.",
    ],
    documents: [
      "Domicile certificate, if required",
      "Academic records",
      "Income certificate, if required",
      "Bank details",
    ],
    description:
      "Explore state scholarship and fee-reimbursement schemes for eligible students in Uttar Pradesh.",
    website: "https://scholarship.up.gov.in/",
  },
  {
    id: 3,
    name: "AICTE Scholarship Opportunities",
    provider: "All India Council for Technical Education",
    level: "Undergraduate",
    type: "Government",
    category: "Technical Education",
    eligibility: [
      "Eligibility varies by AICTE scheme.",
      "Some schemes may have course, admission or category requirements.",
      "Check the official scheme notice before applying.",
    ],
    documents: [
      "Admission and academic records",
      "Identity documents",
      "Other documents specified by the scheme",
    ],
    description:
      "Check official AICTE information for scholarship opportunities associated with technical education.",
    website: "https://www.aicte-india.org/",
  },
  {
    id: 4,
    name: "Postgraduate Scholarship Opportunities",
    provider: "Government & Participating Institutions",
    level: "Postgraduate",
    type: "Merit-Based",
    category: "Higher Education",
    eligibility: [
      "Requirements vary by scholarship provider.",
      "Academic performance and enrollment conditions may apply.",
      "Confirm the eligible degree and institution before applying.",
    ],
    documents: [
      "Undergraduate marksheets",
      "Proof of postgraduate admission",
      "Identity and bank details",
    ],
    description:
      "Explore postgraduate funding options and verify their requirements with the relevant provider.",
    website: "https://scholarships.gov.in/",
  },
  {
    id: 5,
    name: "Private Foundation Scholarships",
    provider: "Participating Foundations",
    level: "All Levels",
    type: "Need-Based",
    category: "Financial Assistance",
    eligibility: [
      "Eligibility depends on the foundation.",
      "Financial need may be considered.",
      "Some programs may require an essay or interview.",
    ],
    documents: [
      "Academic records",
      "Income proof, if required",
      "Personal statement, if required",
    ],
    description:
      "Discover private funding opportunities and review each foundation's official requirements.",
    website: "https://scholarships.gov.in/",
  },
  {
    id: 6,
    name: "Research Fellowship Opportunities",
    provider: "Participating Research Institutions",
    level: "Research",
    type: "Merit-Based",
    category: "Research Funding",
    eligibility: [
      "Requirements vary by fellowship.",
      "A qualifying degree or research admission may be required.",
      "Some fellowships require an entrance test or research proposal.",
    ],
    documents: [
      "Academic transcripts",
      "Research proposal, if required",
      "Admission or examination details",
    ],
    description:
      "Explore research funding and fellowship information through official institutions and scheme notices.",
    website: "https://www.aicte-india.org/",
  },
];

function Scholarships({ onBack }) {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [type, setType] = useState("All");
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const levels = [
    ...new Set(scholarshipData.map((item) => item.level)),
  ];

  const types = [
    ...new Set(scholarshipData.map((item) => item.type)),
  ];

  const filteredScholarships = scholarshipData.filter((item) => {
    const searchableText = [
      item.name,
      item.provider,
      item.category,
      item.description,
      item.level,
      item.type,
    ]
      .join(" ")
      .toLowerCase();

    return (
      searchableText.includes(search.toLowerCase()) &&
      (level === "All" ||
        item.level === level ||
        item.level === "All Levels") &&
      (type === "All" || item.type === type)
    );
  });

  if (selectedScholarship) {
    return (
      <main className="scholarships-page">
        <button
          className="scholarship-back"
          onClick={() => setSelectedScholarship(null)}
        >
          ← Back to scholarships
        </button>

        <section className="scholarship-detail">
          <span className="scholarship-badge">
            {selectedScholarship.type}
          </span>

          <h1>{selectedScholarship.name}</h1>
          <p className="scholarship-provider">
            Provider: {selectedScholarship.provider}
          </p>

          <p>{selectedScholarship.description}</p>

          <div className="scholarship-facts">
            <div>
              <span>Education level</span>
              <strong>{selectedScholarship.level}</strong>
            </div>
            <div>
              <span>Category</span>
              <strong>{selectedScholarship.category}</strong>
            </div>
          </div>

          <h3>Eligibility criteria</h3>
          <ul>
            {selectedScholarship.eligibility.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3>Documents to check</h3>
          <ul>
            {selectedScholarship.documents.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="scholarship-disclaimer">
            This is a guidance listing, not a verified active application.
            Confirm current eligibility, deadlines, benefits and required
            documents on the official website.
          </p>

          <a
            className="scholarship-apply"
            href={selectedScholarship.website}
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
    <main className="scholarships-page">
      <button className="scholarship-back" onClick={onBack}>
        ← Back to Home
      </button>

      <header className="scholarships-header">
        <span className="scholarships-eyebrow">
          FUND YOUR FUTURE
        </span>
        <h1>Find Your Scholarship</h1>
        <p>
          Explore funding resources for your education and learn where to
          verify eligibility and application requirements.
        </p>
      </header>

      <section className="scholarship-filters">
        <input
          type="text"
          placeholder="Search scholarships or providers..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search scholarships"
        />

        <select
          value={level}
          onChange={(event) => setLevel(event.target.value)}
          aria-label="Filter by education level"
        >
          <option value="All">All education levels</option>
          {levels.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          aria-label="Filter by scholarship type"
        >
          <option value="All">All scholarship types</option>
          {types.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </section>

      <p className="scholarship-count">
        {filteredScholarships.length} funding resources found
      </p>

      <section className="scholarship-grid">
        {filteredScholarships.length > 0 ? (
          filteredScholarships.map((item) => (
            <article className="scholarship-card" key={item.id}>
              <div className="scholarship-card-top">
                <span className="scholarship-badge">{item.type}</span>
                <span className="scholarship-level">{item.level}</span>
              </div>

              <h2>{item.name}</h2>
              <p className="scholarship-provider">{item.provider}</p>
              <p>{item.description}</p>

              <div className="scholarship-category">
                {item.category}
              </div>

              <button
                className="scholarship-details-button"
                onClick={() => setSelectedScholarship(item)}
              >
                Check Eligibility →
              </button>
            </article>
          ))
        ) : (
          <div className="scholarship-empty">
            <h2>No matching resources found</h2>
            <p>Try another search or reset your filters.</p>

            <button
              className="scholarship-details-button"
              onClick={() => {
                setSearch("");
                setLevel("All");
                setType("All");
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

export default Scholarships;
