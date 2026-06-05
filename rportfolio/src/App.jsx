import "./App.css";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import CollegeProject from "./components/CollegeProject";
import NotesProject from "./components/NotesProject";

/* ========================================
   DATA
   ======================================== */
const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Works", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", color: "#e34f26", icon: "H" },
      { name: "CSS3", color: "#1572b6", icon: "C" },
      { name: "JavaScript", color: "#f7df1e", icon: "JS" },
      { name: "React", color: "#61dafb", icon: "R" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", color: "#339933", icon: "N" },
      { name: "Express.js", color: "#ffffff", icon: "Ex" },
      { name: "MongoDB", color: "#47a248", icon: "M" },
    ],
  },
  {
    title: "Tools & Design",
    skills: [
      { name: "Git", color: "#f05032", icon: "G" },
      { name: "Photoshop", color: "#31a8ff", icon: "Ps" },
      { name: "VS Code", color: "#007acc", icon: "VS" },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "C", color: "#a8b9cc", icon: "C" },
      { name: "Java", color: "#ed8b00", icon: "J" },
      { name: "Python", color: "#3776ab", icon: "Py" },
    ],
  },
];

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" />
      </svg>
    ),
    title: "Frontend Development",
    text: "I build responsive, performant user interfaces using React, HTML, CSS, and JavaScript with meticulous attention to detail and accessibility.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Backend Development",
    text: "I create robust RESTful APIs and server-side logic using Node.js, Express.js, and MongoDB with security best practices.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "3D Web Design",
    text: "I add interactive 3D elements and immersive experiences using Three.js, React Three Fiber, and creative CSS animations.",
  },
];

const PROJECTS = [
  {
    num: "01",
    title: "Portfolio Website",
    tags: ["React", "Node.js", "Express", "MongoDB", "Responsive Design", "Modern UI/UX"],
    text: "A full-stack developer portfolio built with React, Node.js, Express.js, and MongoDB. Features responsive design, modern UI/UX techniques, smooth animations, glassmorphism aesthetics, and a clean component-driven architecture — showcasing end-to-end development skills from design to deployment.",
    link: null,
    icon: "globe",
  },
];

/* ========================================
   ICONS
   ======================================== */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.334-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5,12 12,5 19,12" />
  </svg>
);

/* ========================================
   HOOKS
   ======================================== */
function useScrollPast(threshold = 30) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return past;
}

function useActiveSection(sectionIds) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sectionIds]);
  return active;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useRevealOnScroll(deps = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.revealDelay || 0;
            setTimeout(() => {
              entry.target.classList.add("revealed");
            }, Number(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const elements = document.querySelectorAll("[data-reveal]:not(.revealed)");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, deps);
}

/* ========================================
   COMPONENTS
   ======================================== */
function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}

function DotGrid() {
  return <div className="dot-grid" aria-hidden="true" />;
}

function ScrollToTop() {
  const visible = useScrollPast(400);
  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <button
      className={`scroll-top ${visible ? "visible" : ""}`}
      onClick={handleClick}
      aria-label="Scroll to top"
      type="button"
    >
      <ArrowUpIcon />
    </button>
  );
}

function GeometricBg() {
  return (
    <div className="geometric-bg" aria-hidden="true">
      <div className="geo-shape geo-1" />
      <div className="geo-shape geo-2" />
      <div className="geo-shape geo-3" />
      <div className="geo-shape geo-4" />
    </div>
  );
}

function Navbar() {
  const scrolled = useScrollPast(30);
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection(["about", "services", "projects", "experience"]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <Link to="/" className="logo" onClick={close}>Abhijith</Link>

        <ul className="nav-links">
          {NAV_ITEMS.map((item) => {
            const id = item.href.replace("#", "");
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={activeSection === id ? "active" : ""}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a href="mailto:pjabhijith8@gmail.com" className="nav-cta">
          Let's Talk
        </a>

        <button
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          type="button"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-inner">
          <ul>
            {NAV_ITEMS.map((item, i) => (
              <li key={item.href} style={{ "--i": i }}>
                <a href={item.href} onClick={close}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-socials">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href="mailto:pjabhijith8@gmail.com" aria-label="Email"><MailIcon /></a>
          </div>
        </div>
      </div>
    </>
  );
}

function useTypingAnimation(words, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState(words[0]);
  const stateRef = useRef({ wordIndex: 0, isDeleting: false });

  useEffect(
    () => {
      let timeout;
      const tick = () => {
        const { wordIndex, isDeleting } = stateRef.current;
        const currentWord = words[wordIndex];

        if (!isDeleting && displayText === currentWord) {
          timeout = setTimeout(() => {
            stateRef.current.isDeleting = true;
            tick();
          }, pauseTime);
          return;
        }

        if (isDeleting && displayText === "") {
          stateRef.current.isDeleting = false;
          stateRef.current.wordIndex = (wordIndex + 1) % words.length;
          timeout = setTimeout(tick, typingSpeed);
          return;
        }

        const nextText = isDeleting
          ? currentWord.substring(0, displayText.length - 1)
          : currentWord.substring(0, displayText.length + 1);

        setDisplayText(nextText);
        timeout = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed);
      };

      timeout = setTimeout(tick, typingSpeed);
      return () => clearTimeout(timeout);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return displayText;
}

function Hero() {
  const words = ["MERN Stack Developer", "Frontend Developer", "Backend Developer", "3D Web Designer"];
  const displayText = useTypingAnimation(words);

  return (
    <section className="hero">
      <GeometricBg />
      <div className="hero-content">
        <div className="hero-left" data-reveal>
          <span className="greeting">Hey There,</span>
          <h1>
            I'm <span className="name-gradient">Abhijith PJ</span>
          </h1>
          <p className="hero-subtitle">
            A passionate{" "}
            <span className="typing-text">
              <span className="typing-word">{displayText}</span>
              <span className="typing-cursor" />
            </span>{" "}
            crafting modern web experiences with clean code and creative design.
          </p>
          <div className="hero-actions">
            <a href="mailto:pjabhijith8@gmail.com" className="email">
              <MailIcon /> pjabhijith8@gmail.com
            </a>
            <div className="hero-socials">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="GitHub">
                <GithubIcon />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="hero-center" data-reveal data-reveal-delay="150">
          <div className="profile-ring">
            <div className="profile-image">
              <img src="/k.png" alt="Abhijith PJ" loading="eager" />
            </div>
          </div>
          <div className="hero-badge">
            <span className="badge-dot" /> Open to Work
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section" id="about">
      <h2 className="section-title" data-reveal>About Me</h2>
      <p className="section-subtitle" data-reveal>
        Get to know who I am and what drives me
      </p>
      <div className="about-grid" data-reveal>
        <div className="about-box">
          <div className="about-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h3>Who I Am</h3>
          <p>
            I'm Abhijith PJ, a MERN stack developer dedicated to building
            modern and responsive web applications. I enjoy working with React,
            Node.js, Express.js, MongoDB, and creative 3D web designs.
          </p>
        </div>
        <div className="about-box">
          <div className="about-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
            </svg>
          </div>
          <h3>What I Do</h3>
          <p>
            I constantly explore new technologies to level up my development
            skills and create impactful digital experiences. Every project is
            an opportunity to learn and push boundaries.
          </p>
        </div>
        <div className="about-box">
          <div className="about-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          </div>
          <h3>My Goal</h3>
          <p>
            To build web applications that not only function flawlessly but
            also deliver delightful user experiences. I aim to grow as a
            full-stack developer and contribute to meaningful projects.
          </p>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats-section" id="experience">
      <div className="stat-card" data-reveal>
        <div className="stat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
        <h2>1+</h2>
        <p>Years Learning</p>
      </div>
      <div className="stat-card" data-reveal data-reveal-delay="100">
        <div className="stat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h2>5+</h2>
        <p>Projects Completed</p>
      </div>
      <div className="stat-card" data-reveal data-reveal-delay="200">
        <div className="stat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" />
          </svg>
        </div>
        <h2>MERN</h2>
        <p>Stack Developer</p>
      </div>
      <a href="/Abhijith_Resume.pdf" download className="resume-btn" data-reveal data-reveal-delay="300">
        Download Resume
      </a>
    </section>
  );
}

function Services() {
  return (
    <section className="services-section" id="services">
      <h2 className="section-title" data-reveal>What I Do</h2>
      <p className="section-subtitle" data-reveal>
        Services I offer to bring your ideas to life
      </p>
      <div className="services-container">
        {SERVICES.map((s, i) => (
          <div
            className="service-card"
            data-reveal
            data-reveal-delay={i * 100}
            key={s.title}
          >
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <div className="service-glow" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectIcon({ type }) {
  const icons = {
    note: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    book: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    globe: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  };
  return icons[type] || icons.note;
}

function Projects() {
  const project = PROJECTS[0];
  return (
    <section className="projects-section" id="projects">
      <h2 className="section-title" data-reveal>My Projects</h2>
      <p className="section-subtitle" data-reveal>
        A selection of work I'm proud of
      </p>

      <article className="project-card-featured" data-reveal>
        <div className="project-card-featured-inner">
          <div className="project-card-featured-header">
            <div className="project-card-icon">
              <ProjectIcon type={project.icon} />
            </div>
            <span className="project-card-num">{project.num}</span>
          </div>
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-text">{project.text}</p>
          <div className="project-tags">
            {project.tags.map((t) => (
              <span className="project-tag" key={t}>{t}</span>
            ))}
          </div>
        </div>
        <div className="project-card-featured-glow" />
      </article>

      <div className="college-btn-box" data-reveal>
        <Link to="/projects" className="college-projects-btn">
          College Projects <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills-section" id="skills">
      <h2 className="section-title" data-reveal>My Skills</h2>
      <p className="section-subtitle" data-reveal>
        Technologies and tools I work with
      </p>
      <div className="skills-grid">
        {SKILL_CATEGORIES.map((category, catIndex) => (
          <div className="skill-category" key={category.title} data-reveal data-reveal-delay={catIndex * 100}>
            <h3 className="skill-category-title">{category.title}</h3>
            <div className="skill-items">
              {category.skills.map((skill, i) => (
                <div
                  className="skill-item"
                  key={skill.name}
                  data-reveal-delay={catIndex * 100 + i * 50}
                  data-reveal
                >
                  <div
                    className="skill-icon"
                    style={{ background: `${skill.color}18`, color: skill.color, borderColor: `${skill.color}30` }}
                  >
                    {skill.icon}
                  </div>
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      console.log("Saved:", data);

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Message could not be sent");
    }
  };

  return (
    <section className="contact-section" id="contact">
      <h2 className="section-title" data-reveal>Get In Touch</h2>
      <p className="section-subtitle" data-reveal>
        Have a project in mind? Let's work together
      </p>
      <div className="contact-wrapper" data-reveal>
        <div className="contact-info">
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <MailIcon />
            </div>
            <div>
              <h4>Email</h4>
              <a href="mailto:pjabhijith8@gmail.com">pjabhijith8@gmail.com</a>
            </div>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <h4>Location</h4>
              <p>Kerala, India</p>
            </div>
          </div>
          <div className="contact-socials">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows="5"
              required
            />
          </div>
          <button type="submit" className={`submit-btn ${submitted ? "submitted" : ""}`}>
            {submitted ? "Message Sent!" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="logo">Abhijith</Link>
          <p>MERN Stack Developer crafting modern web experiences.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#projects">Works</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-social">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href="mailto:pjabhijith8@gmail.com" className="social-link" aria-label="Email">
              <MailIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Abhijith PJ. All rights reserved.</p>
      </div>
    </footer>
  );
}

function HomePage() {
  useRevealOnScroll();
  return (
    <div className="portfolio">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Services />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function ScrollToTopOnRoute() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div className="app-wrapper">
      <ScrollProgress />
      <DotGrid />
      <ScrollToTopOnRoute />
      <div key={location.pathname} className="page-transition">
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<CollegeProject />} />
          <Route path="/notes-project" element={<NotesProject />} />
        </Routes>
      </div>
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
