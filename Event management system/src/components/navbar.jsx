import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-lg font-bold">Event Management</h1>
        <div>
          <Link className="mx-2" to="/">Home</Link>
          <Link className="mx-2" to="/events">Events</Link>
          <Link className="mx-2" to="/create-event">Create Event</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
