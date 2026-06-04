import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./Project.css";

function NotesProject() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="notes-project-page">
      <Link to="/" className="back-home-btn">
        ← Back Home
      </Link>

      <h1>Notes App</h1>
      <p className="section-subtitle">
        A full-stack MERN application used to create, edit, and delete notes.
      </p>
      <p>
        Built with React on the frontend and Node.js, Express.js, and MongoDB on
        the backend. The app features authentication, real-time updates, and a
        clean responsive interface.
      </p>
    </div>
  );
}

export default NotesProject;
