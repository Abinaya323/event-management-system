import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  const defaultEvents = [
    { title: "Music Concert", date: "2025-04-10", description: "Live performance by top artists." },
    { title: "Tech Conference", date: "2025-05-05", description: "Latest innovations in AI and ML." },
    { title: "Food Festival", date: "2025-06-20", description: "Taste cuisines from around the world." },
  ];

  const [events, setEvents] = useState(defaultEvents);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const deleteEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const login = (email, password) => {
    if (email === "abinaya@gmail.com" && password === "1234") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Credentials! Try again.");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Navbar logout={logout} />}
        <div className="main-content">
          <Routes>
            {!isAuthenticated ? (
              <Route path="*" element={<Login login={login} />} />
            ) : (
              <>
                <Route path="/" element={<Home events={events} deleteEvent={deleteEvent} />} />
                <Route path="/create" element={<CreateEvent addEvent={addEvent} />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const Navbar = ({ logout }) => {
  return (
    <nav className="navbar">
      <h2 className="logo">🎉 Event Manager</h2>
      <div className="nav-links">
        <Link to="/">🏠 Home</Link>
        <Link to="/create">➕ Create Event</Link>
        <button className="logout-btn" onClick={logout}>🚪 Logout</button>
      </div>
    </nav>
  );
};

const Home = ({ events, deleteEvent }) => {
  const calculateDaysLeft = (eventDate) => {
    const today = new Date();
    const eventDay = new Date(eventDate);
    const diffTime = eventDay - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div>
      <h2 className="title">Upcoming Events</h2>
      {events.length === 0 ? (
        <p className="welcome-text">No events available. Click "Create Event" to add one!</p>
      ) : (
        <div className="event-list">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p>{event.description}</p>
              <p className="countdown">📅 {calculateDaysLeft(event.date)} days left</p>
              <button className="delete-btn" onClick={() => deleteEvent(index)}>🗑 Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CreateEvent = ({ addEvent }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !description) {
      alert("Please fill in all fields");
      return;
    }
    addEvent({ title, date, description });
    setTitle("");
    setDate("");
    setDescription("");
    alert("Event Created Successfully!");
  };

  return (
    <div className="form-container">
      <h2>Create a New Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default App;
