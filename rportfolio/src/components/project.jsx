import React from "react";
import "./Project.css";


function Project() {
    return (
    <section className="college-project-page">
      <a href="/" className="back-home-btn">← Back Home</a>

      <h1>College Projects</h1>

      <div className="project-detail">
        <h2>Home Maintenance and Service Provider</h2>
        <h3>Abstract</h3>
          <p>
    The Home Maintenance and Service Provider System is a web-based application
    designed to help users easily book home services online. The system provides
    services such as painting, plumbing, carpentry, electrical work, and other
    home maintenance tasks through a simple and user-friendly interface.
  </p>

  <p>
    Users can view available services, choose the required service, and book it
    online without directly visiting a service provider. The system helps reduce
    the difficulty of finding trusted workers for home maintenance needs and
    makes the service booking process faster and more convenient.
  </p>

  <p>
    The project is developed using HTML, CSS, JavaScript, and MongoDB. MongoDB
    is used to store user details, service information, and booking records.
    This project demonstrates a practical solution for connecting customers with
    home service providers through an online platform.
  </p>

        <img src="/project1.png" alt="Project 1" />
      </div>

      <div className="project-detail">
        <h2>NAVIA:A Voice Controlled Campus Guide Robot</h2>
        <h3>Abstract</h3>
         <p>
    NAVIA is a voice-controlled intelligent robot guide designed to assist users
    by providing information and location guidance in an institutional
    environment. The system combines artificial intelligence, speech recognition,
    text-to-speech, robotic movement, and a graphical user interface to create
    an interactive user experience.
  </p>

  <p>
    The robot receives voice commands from the user and processes them using a
    speech recognition system. For predefined commands such as locating the HOD
    cabin, staff room, or library, NAVIA plays the corresponding guidance video.
    For general questions, the system uses the Gemini AI model to generate short
    and relevant answers, which are then converted into speech output.
  </p>

  <p>
    NAVIA is also equipped with IR sensors for line following and an ultrasonic
    sensor for obstacle detection. The robot’s movement and hand gestures are
    controlled using Arduino, while the main interface and AI processing are
    handled through a Python-based Tkinter GUI.
  </p>
   <h3>Technologies Used</h3>
  <p>
    Python, Tkinter, Gemini AI, Speech Recognition, Text-to-Speech, Arduino,
    IR Sensor, Ultrasonic Sensor
  </p>

        <img src="/project2.png" alt="Project 2" />
      </div>
    </section>
  );
}


export default Project;