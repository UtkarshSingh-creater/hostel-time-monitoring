import { useNavigate } from "react-router-dom";
import { getDeviceId } from "../utils/device";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    const student = JSON.parse(localStorage.getItem("STUDENT"));

    if (!student) {
      alert("No account found. Please register first.");
      return;
    }

    const deviceId = getDeviceId();
    if (student.deviceId !== deviceId) {
      alert("This account is already registered on another device.");
      return;
    }

    localStorage.setItem("AUTH", "true");
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <h2 className="title">Student Login</h2>
      <p className="subtitle">
        Login to scan hostel QR and view your status
      </p>

      <input placeholder="Student ID" />
      <input type="password" placeholder="Password" />

      <button className="primary-btn" onClick={handleLogin}>
        Login
      </button>

      <p className="link" onClick={() => navigate("/register")}>
        New student? Create account
      </p>
    </div>
  );
}
