

import { useState } from "react";
import CareerChat from "./CareerChat";
import CareerExplore from "./CareerExplore";
import Colleges from "./Colleges";
import Courses from "./Courses";
import Scholarships from "./Scholarships";
import StudentProfile from "./StudentProfile";

const services = [
  {
    title: "Explore Careers",
    description: "Discover career paths that match your interests.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=700",
  },
  {
    title: "Find Colleges",
  description: "Explore colleges and courses for your future.",
  image: "/images/college-campus.png.avif",
  },
  {
    title: "Courses & Skills",
    description: "Find learning opportunities to build your skills.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700",
  },
  {
    title: "Scholarships",
    description: "Discover financial support and opportunities.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700",
  },
];

function App() {
const [chatOpen, setChatOpen] = useState(false);
const [showCareers, setShowCareers] = useState(false);
const [showColleges, setShowColleges] = useState(false);
const [showCourses, setShowCourses] = useState(false);
const [showScholarships, setShowScholarships] = useState(false);
const [showProfile, setShowProfile] = useState(false);

if (showCareers) {
  return (
    <CareerExplore
      onBack={() => setShowCareers(false)}
    />
  );
}

if (showColleges) {
  return (
    <Colleges onBack={() => setShowColleges(false)} />
  );
}

if (showCourses) {
  return <Courses onBack={() => setShowCourses(false)} />;
}

if (showScholarships) {
  return (
    <Scholarships
      onBack={() => setShowScholarships(false)}
    />
  );
}
if (showProfile) {
  return (
    <StudentProfile
      onBack={() => setShowProfile(false)}
    />
  );
}

  return (
    <div className="website">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">CG</span>
          <span>
            Career<span className="brand-accent">Gateway</span>
            <small>YOUR FUTURE, YOUR CHOICE</small>
          </span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Explore Careers</a>
          <a href="#services">Colleges</a>
          <a href="#services">Scholarships</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">YOUR JOURNEY STARTS HERE</span>

            <h1>
              Your Career Path
              <br />
              Begins <span>Here.</span>
            </h1>

            <p>
              Discover your strengths, explore career opportunities
              and take the next step towards your future.
            </p>

            <div className="hero-actions">
              <a className="primary-btn" href="#services">
                Explore Now →
              </a>
              <a className="secondary-btn" href="#assistant">
                Meet Your AI Guide
              </a>
              <button
              type="button"
              className="primary-btn"
              onClick={() => setShowProfile(true)}
              >
            Build Your Profile →
          </button>
            </div>

            <div className="hero-note">
              <span className="status-dot" />
              Career guidance, made simpler.
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200"
              alt="Professionals collaborating and discussing career goals"
            />
            <div className="image-caption">
              <span className="caption-icon">✦</span>
              <div>
                <strong>Your potential, our priority</strong>
                <p>Make informed career decisions.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="services" id="services">
          <div className="section-heading">
            <span className="eyebrow">WHAT WE OFFER</span>
            <h2>Everything you need to move forward.</h2>
            <p>
              Find the right information to make your next move
              with confidence.
            </p>
          </div>

         
<div className="service-grid">
  {services.map((service) => (
    <article className="service-card" key={service.title}>
      <img src={service.image} alt={service.title} />

      <div className="service-info">
        <h3>{service.title}</h3>
        <p>{service.description}</p>

          
{service.title === "Explore Careers" ? (
  <button
    type="button"
    className="career-details-button"
    onClick={() => setShowCareers(true)}
  >
    Explore more ↗
  </button>
) : service.title === "Find Colleges" ? (
  <button
    type="button"
    className="career-details-button"
    onClick={() => setShowColleges(true)}
  >
    Explore more ↗
  </button>
) :service.title === "Courses & Skills" ? (
  <button
    type="button"
    className="career-details-button"
    onClick={() => setShowCourses(true)}
  >
    Explore more ↗
  </button>
): service.title === "Scholarships" ? (
  <button
    type="button"
    className="career-details-button"
    onClick={() => setShowScholarships(true)}
  >
    Explore more ↗
  </button>
) : (
  <a href="#assistant">Explore more ↗</a>
)}

        </div>
      </article>
    ))}
  </div>

        </section>

        <section className="assistant-banner" id="assistant">
          <div>
            <span className="eyebrow">YOUR PERSONAL CAREER GUIDE</span>
            <h2>Not sure where to begin?</h2>
            <p>
              Your career journey starts with a conversation.
              Explore your options and find your direction.
            </p>
          </div>
        <button
  type="button"
  className="primary-btn"
  onClick={() => setChatOpen(true)}
>
  Meet Your AI Assistant ↗
</button>

{chatOpen && (
  <CareerChat onClose={() => setChatOpen(false)} />
)}
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon">CG</span>
          <span>CareerGateway</span>
        </a>
        <p>Helping you make informed decisions about your future.</p>
        <span>© 2026 Career Gateway</span>
      </footer>
    </div>
  );
}

export default App;
