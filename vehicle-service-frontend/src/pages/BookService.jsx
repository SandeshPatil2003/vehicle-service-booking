import { useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

function BookService() {
  const [services] = useState([
    { id: 1, name: "Oil Change" },
    { id: 2, name: "Tire Repair" },
    { id: 3, name: "Full Service" }
  ]);
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected(
      selected.includes(id)
        ? selected.filter(x => x !== id)
        : [...selected, id]
    );
  };

  const book = async () => {
    await API.post("/bookings", { serviceIds: selected });
    alert("Booking successful");
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h3>Select Services</h3>
        {services.map(s => (
          <div key={s.id}>
            <input type="checkbox" onChange={() => toggle(s.id)} /> {s.name}
          </div>
        ))}
        <button className="btn btn-success mt-3" onClick={book}>Book</button>
      </div>
    </>
  );
}

export default BookService;
