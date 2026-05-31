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

// async function fetchContacts() {
//   try {
//     const response = await fetch("https://portbackend-1-o5d1.onrender.com/contact")
//     const data = await response.json();
//     setContacts(data);
//   } catch (err) {
//     console.log("Error fetching contacts:", err);
//   }
// }

async function handleSubmit() {
  if (name === "" || email === "" || message === "") {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch("https://portbackend-1-o5d1.onrender.com/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    const data = await response.json();
console.log("Backend response:", data);

if (!response.ok) {
  alert(data.error || "Message not saved");
  return;
}

    setName("");
    setEmail("");
    setMessage("");
    setSuccess(`thankyou ${name} for your response!`); 
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
      <Route path="/" element={
    <div className="portfolio">

      <nav className="navbar">
        <div className="logo">Abhijith</div>

              <ul className="nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#projects">Works</a></li>
        <li><a href="#contact">Notes</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#about">About</a></li>
      </ul>

        <div className="phone">+91 12345 67890</div>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <h1>
            Hey There, <br />
            I’m Abhijith PJ
          </h1>

          <p className="email">abhijithpj@gmail.com</p>
      
        </div>
        <div className="hero-center">
  <div className="image-3d-card">
    <img src="/k.png" alt="Abhijith PJ" />
  </div>
</div>

       <div className="hero-right">
  <div className="info-card">
    <p>
      I design and build <span>modern web applications</span> using
      <span> React</span>, <span>Node.js</span>, <span>Express.js</span>,
      and <span>MongoDB</span>.
    </p>
  </div>
</div>

      </section>
      <section className="about-section" id="about">
  <h2 className="section-title">About Me</h2>

  <div className="about-box">
    <p>
      Hi, I’m Abhijith PJ, a beginner MERN stack developer learning to build
      modern and responsive web applications. I enjoy working with React,
      Node.js, Express.js, MongoDB, and creative 3D web designs.
    </p>
  </div>
</section>
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
<section className="services-section" id="services">
  <h2 className="section-title">What I Do</h2>

  <div className="services-container">
    <div className="service-card">
      <h3>Frontend Development</h3>
      <p>I build responsive user interfaces using React, HTML, CSS, and JavaScript.</p>
    </div>

    <div className="service-card">
      <h3>Backend Development</h3>
      <p>I create APIs using Node.js, Express.js, and MongoDB.</p>
    </div>

    <div className="service-card">
      <h3>3D Web Design</h3>
      <p>I add interactive 3D elements using Three.js and React Three Fiber.</p>
    </div>
  </div>
</section>
<section className="projects-section" id="projects">
  <h2 className="section-title">My Projects</h2>

  <div className="projects-container">
    <div className="project-card">
      <h3>Notes App</h3>
      <p>A simple MERN app to create, read, update, and delete notes.</p>
        <Link to="/notes-project">
  <button>View Project</button>
</Link>
    </div>

    <div className="project-card">
      <h3>Book API</h3>
      <p>Backend API using Node.js, Express.js, MongoDB, and Mongoose.</p>
      <button>View Project</button>
    </div>

    <div className="project-card">
      <h3>Portfolio Website</h3>
      <p>Personal portfolio website built using React and CSS.</p>
      <button>View Project</button>
    </div>
  </div>
    <div className="college-btn-box">
    <Link to="/projects" className="college-projects-btn">
  College Projects
</Link>
  </div>
</section>
<section className="skills-section">
  <h2 className="section-title">My Skills</h2>

  <div className="skills-container">
    <div className="skill-box">HTML</div>
    <div className="skill-box">CSS</div>
    <div className="skill-box">JavaScript</div>
    <div className="skill-box">React</div>
    <div className="skill-box">Node.js</div>
    <div className="skill-box">Express.js</div>
    <div className="skill-box">MongoDB</div>
    <div className="skill-box">photoshop</div>
    <div className="skill-box">c</div>
    <div className="skill-box">JAVA</div>
  </div>
</section>
 <section className="contact-section" id="contact">
  <h2 className="section-title">Contact Me</h2>

  <div className="contact-box">
    <input type="text" placeholder="Your Name" 
     value={name}
      onChange={(e) => setName(e.target.value)}
    />
    {name && <p className="typing-preview">Typing: {name}</p>}

    <input type="email" placeholder="Your Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
       />
    <textarea placeholder="Your Message"
      value={message}
      onChange={(e) => setMessage(e.target.value)} ></textarea>
    <button onClick={handleSubmit}>Send Message</button>
    {success && <p className="success-message">{success}</p>}
  </div>
</section>

{contacts.length > 0 && (
  <div className="messages-list">
    <h3>Your Message Saved</h3>

    {contacts.map((item) => (
      <div className="message-card" key={item._id}>
        <p><b>Name:</b> {item.name}</p>
        <p><b>Email:</b> {item.email}</p>
        <p><b>Message:</b> {item.message}</p>
      </div>
    ))}
  </div>
)}

 <footer className="footer">
  <p>© 2026 Abhijith PJ. All rights reserved.</p>
</footer>

</div>
} />

<Route path="/projects" element={<CollegeProject />} />
<Route path="/notes-project" element={<NotesProject />} />

</Routes>
</BrowserRouter>
);
}

export default App;