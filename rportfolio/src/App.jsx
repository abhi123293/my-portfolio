import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CollegeProject from "./components/CollegeProject";
import NotesProject from "./components/NotesProject";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [contacts, setContacts] = useState([]);

  async function handleSubmit() {
    if (name === "" || email === "" || message === "") {
      alert("Please fill all fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (message.trim().length < 10) {
      alert("Message must contain at least 10 characters");
      return;
    }

    try {
      const response = await fetch(
        "https://portbackend-1-o5d1.onrender.com/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        }
      );

      const data = await response.json();
      console.log("Backend response:", data);

      if (!response.ok) {
        alert(data.error || "Message not saved");
        return;
      }

      setName("");
      setEmail("");
      setMessage("");
      setSuccess(`Thank you ${name} for your response!`);
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      setContacts([data]);

      setTimeout(() => {
        setContacts([]);
      }, 7000);
    } catch (err) {
      console.log("Error:", err);
      alert("Something went wrong");
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="portfolio">
              {/* ─── Navbar ─── */}
              <nav className="navbar">
                <div className="logo">Abhijith</div>

                <ul className="nav-links">
                  <li>
                    <a href="#about">About</a>
                  </li>
                  <li>
                    <a href="#services">Services</a>
                  </li>
                  <li>
                    <a href="#projects">Works</a>
                  </li>
                  <li>
                    <a href="#experience">Experience</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </ul>

                <div className="phone">+91 12345 67890</div>
              </nav>

              {/* ─── Hero ─── */}
              <section className="hero">
                <div className="hero-left">
                  <h1>
                    <span className="greeting">Hey There,</span>
                    I'm{" "}
                    <span className="name-gradient">Abhijith PJ</span>
                  </h1>
                  <p className="hero-subtitle">
                    A passionate{" "}
                    <span className="tech">MERN Stack Developer</span> crafting
                    modern web experiences with clean code and creative design.
                  </p>
                  <p className="email">abhijithpj@gmail.com</p>
                </div>

                <div className="hero-center">
                  <div className="image-3d-card">
                    <img src="/k.png" alt="Abhijith PJ" />
                  </div>
                </div>


              </section>

              {/* ─── About ─── */}
              <section className="about-section" id="about">
                <h2 className="section-title">About Me</h2>
                <p className="section-subtitle">
                  Get to know who I am and what drives me
                </p>
                <div className="about-box">
                  <p>
                    Hi, I'm Abhijith PJ, a beginner MERN stack developer
                    learning to build modern and responsive web applications. I
                    enjoy working with React, Node.js, Express.js, MongoDB, and
                    creative 3D web designs. I'm constantly exploring new
                    technologies to level up my development skills and create
                    impactful digital experiences.
                  </p>
                </div>
              </section>

              {/* ─── Experience / Stats ─── */}
              <section className="stats-section" id="experience">
                <div className="stat-card">
                  <h2>1+</h2>
                  <p>Years Learning</p>
                </div>

                <div className="stat-card">
                  <h2>5+</h2>
                  <p>Projects Completed</p>
                </div>

                <div className="stat-card">
                  <h2>MERN</h2>
                  <p>Stack Developer</p>
                </div>

                <a
                  href="/Abhijith_Resume.pdf"
                  download
                  className="resume-btn"
                >
                  Download Resume
                </a>
              </section>

              {/* ─── Services ─── */}
              <section className="services-section" id="services">
                <h2 className="section-title">What I Do</h2>
                <p className="section-subtitle">
                  Services I offer to bring your ideas to life
                </p>

                <div className="services-container">
                  <div className="service-card">
                    <div className="service-icon">⚡</div>
                    <h3>Frontend Development</h3>
                    <p>
                      I build responsive user interfaces using React, HTML,
                      CSS, and JavaScript with attention to detail and
                      performance.
                    </p>
                  </div>

                  <div className="service-card">
                    <div className="service-icon">🔧</div>
                    <h3>Backend Development</h3>
                    <p>
                      I create robust RESTful APIs and server-side logic using
                      Node.js, Express.js, and MongoDB.
                    </p>
                  </div>

                  <div className="service-card">
                    <div className="service-icon">✨</div>
                    <h3>3D Web Design</h3>
                    <p>
                      I add interactive 3D elements and immersive experiences
                      using Three.js and React Three Fiber.
                    </p>
                  </div>
                </div>
              </section>

              {/* ─── Projects ─── */}
              <section className="projects-section" id="projects">
                <h2 className="section-title">My Projects</h2>
                <p className="section-subtitle">
                  A selection of work I'm proud of
                </p>

                <div className="projects-container">
                  <div className="project-card">
                    <div className="project-number">01</div>
                    <h3>Notes App</h3>
                    <div className="project-tags">
                      <span className="project-tag">React</span>
                      <span className="project-tag">Node.js</span>
                      <span className="project-tag">MongoDB</span>
                    </div>
                    <p>
                      A full-stack MERN application to create, read, update,
                      and delete notes with a clean interface.
                    </p>
                    <Link to="/notes-project">
                      <button>View Project →</button>
                    </Link>
                  </div>

                  <div className="project-card">
                    <div className="project-number">02</div>
                    <h3>Book API</h3>
                    <div className="project-tags">
                      <span className="project-tag">Express</span>
                      <span className="project-tag">MongoDB</span>
                      <span className="project-tag">REST</span>
                    </div>
                    <p>
                      A backend RESTful API built with Node.js, Express.js,
                      MongoDB, and Mongoose for book management.
                    </p>
                    <button>View Project →</button>
                  </div>

                  <div className="project-card">
                    <div className="project-number">03</div>
                    <h3>Portfolio Website</h3>
                    <div className="project-tags">
                      <span className="project-tag">React</span>
                      <span className="project-tag">CSS</span>
                      <span className="project-tag">Design</span>
                    </div>
                    <p>
                      This personal portfolio website built using React and
                      modern CSS with 3D effects and animations.
                    </p>
                    <button>View Project →</button>
                  </div>
                </div>

                <div className="college-btn-box">
                  <Link to="/projects" className="college-projects-btn">
                    🎓 College Projects
                  </Link>
                </div>
              </section>

              {/* ─── Skills ─── */}
              <section className="skills-section">
                <h2 className="section-title">My Skills</h2>
                <p className="section-subtitle">
                  Technologies and tools I work with
                </p>

                <div className="skills-container">
                  <div className="skill-box">HTML</div>
                  <div className="skill-box">CSS</div>
                  <div className="skill-box">JavaScript</div>
                  <div className="skill-box">React</div>
                  <div className="skill-box">Node.js</div>
                  <div className="skill-box">Express.js</div>
                  <div className="skill-box">MongoDB</div>
                  <div className="skill-box">Photoshop</div>
                  <div className="skill-box">C</div>
                  <div className="skill-box">Java</div>
                </div>
              </section>

              {/* ─── Contact ─── */}
              <section className="contact-section" id="contact">
                <h2 className="section-title">Get In Touch</h2>
                <p className="section-subtitle">
                  Have a question or want to work together?
                </p>

                <div className="contact-box">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {name && (
                    <p className="typing-preview">Typing: {name}</p>
                  )}

                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <textarea
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <button onClick={handleSubmit}>Send Message ✉</button>
                  {success && (
                    <p className="success-message">{success}</p>
                  )}
                </div>
              </section>

              {/* ─── Saved Messages ─── */}
              {contacts.length > 0 && (
                <div className="messages-list">
                  <h3>Your Message Saved</h3>

                  {contacts.map((item) => (
                    <div className="message-card" key={item._id}>
                      <p>
                        <b>Name:</b> {item.name}
                      </p>
                      <p>
                        <b>Email:</b> {item.email}
                      </p>
                      <p>
                        <b>Message:</b> {item.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ─── Footer ─── */}
              <footer className="footer">
                <p>© 2026 Abhijith PJ. All rights reserved.</p>
              </footer>
            </div>
          }
        />

        <Route path="/projects" element={<CollegeProject />} />
        <Route path="/notes-project" element={<NotesProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;