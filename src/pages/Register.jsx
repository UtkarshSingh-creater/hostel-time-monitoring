import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDeviceId } from "../utils/device";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    studentId: "",
    name: "",
    hostel: "",
    room: "",
    parentPhone: "",
    password: ""
  });

  const submit = (e) => {
    e.preventDefault();

    const student = {
      ...form,
      deviceId: getDeviceId()
    };

    localStorage.setItem("STUDENT", JSON.stringify(student));
    alert("Registration successful. Please login.");
    navigate("/");
  };

  return (
    <div className="container">
      <h2 className="title">Student Registration</h2>
      <p className="subtitle">
        Register once. This account will work on only one device.
      </p>

      <form onSubmit={submit}>
        <input
          placeholder="Student ID / Roll Number"
          required
          onChange={(e) => setForm({ ...form, studentId: e.target.value })}
        />

        <input
          placeholder="Full Name"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Hostel Name"
          required
          onChange={(e) => setForm({ ...form, hostel: e.target.value })}
        />

        <input
          placeholder="Room Number"
          required
          onChange={(e) => setForm({ ...form, room: e.target.value })}
        />

        <input
          placeholder="Parent Phone (SMS Alerts)"
          required
          onChange={(e) => setForm({ ...form, parentPhone: e.target.value })}
        />

        <input
          type="password"
          placeholder="Create Password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="primary-btn" type="submit">
          Register
        </button>
      </form>

      <p className="link" onClick={() => navigate("/")}>
        Already registered? Login
      </p>
    </div>
  );
}
