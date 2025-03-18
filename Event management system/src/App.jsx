import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  // Default events
  const defaultEvents = [
    { title: "Music Concert", date: "2025-03-20", description: "Live performance by top artists." },
    { title: "Tech Conference", date: "2025-04-10", description: "Latest innovations in AI and ML." },
    { title: "Food Festival", date: "2025-05-05", description: "Taste cuisines from around the world." },
  ];

  // State to manage events
  const [events, setEvents] = useState(defaultEvents);

  // Function to add a new event
  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  // Function to delete an event
  const deleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home events={events} deleteEvent={deleteEvent} />} />
          <Route path="/create" element={<CreateEvent addEvent={addEvent} />} />
        </Routes>
      </div>
    </Router>
  );
}

// 🔹 Navbar Component
const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Event Manager</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/create">Create Event</Link>
      </div>
    </nav>
  );
};

// 🏠 Home Component (Displays Events with Delete Button)
const Home = ({ events, deleteEvent }) => {
  return (
    <div className="container">
      <h2>Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events available. Click "Create Event" to add one!</p>
      ) : (
        events.map((event, index) => (
          <div className="event-card" key={index}>
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p>{event.description}</p>
            <button className="delete-btn" onClick={() => deleteEvent(index)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

// 🎉 Create Event Component (Form)
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
    <div className="container">
      <h2>Create a New Event</h2>
      <form onSubmit={handleSubmit}>
        <label>Event Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Event Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default App;
