import { Link } from "react-router-dom";

function NotesProject() {
  return (
    <div>
      <Link to="/">← Back Home</Link>

      <h1>Notes App</h1>

      <p>
        A MERN stack application used to create, edit, and delete notes.
      </p>
    </div>
  );
}

export default NotesProject;