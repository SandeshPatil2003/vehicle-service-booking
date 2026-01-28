import Navbar from "../components/Navbar";

function UserDashboard() {
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2>User Dashboard</h2>
        <a href="/book" className="btn btn-primary">Book Service</a>
      </div>
    </>
  );
}

export default UserDashboard;
