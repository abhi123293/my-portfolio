import { Link } from "react-router-dom";
import "./Project.css";

function NotesProject() {
  return (
    <div className="notes-project-page">
      <Link to="/" className="back-home-btn">
        ← Back Home
      </Link>

      <h1>Notes App</h1>

      <p>
        A full-stack MERN application used to create, edit, and delete notes.
        Built with React on the frontend and Node.js, Express.js, and MongoDB on
        the backend.
      </p>
    </div>
  );
}

export default NotesProject;