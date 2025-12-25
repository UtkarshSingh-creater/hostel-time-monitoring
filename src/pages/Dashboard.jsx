import { useNavigate } from "react-router-dom";
import StatusCircle from "../components/StatusCircle";
import InfoCard from "../components/InfoCard";
import StudentProfile from "../components/StudentProfile";

export default function Dashboard() {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("STUDENT"));

  const logout = () => {
    localStorage.removeItem("AUTH");
    navigate("/");
  };

  return (
    <div className="app-bg">
      <div className="app-container">

        {/* Header */}
        <div className="dashboard-header">
          <h2>Hostel Timing Monitor</h2>

          <div className="header-actions">
            <button
              className="secondary-btn"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/dashboard#profile")}
            >
              Profile
            </button>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Status */}
        <StatusCircle status="IN" timeLeft="04:30:00" />

        {/* Action Buttons (like Check-in / Check-out feel) */}
        <div className="action-row">
          <button
            className="primary-btn"
            onClick={() => navigate("/scan")}
          >
            Scan QR
          </button>

          <button className="secondary-btn">
            View History
          </button>
        </div>

        {/* Info Cards */}
        <div className="card-grid">
          <InfoCard
            title="My Timings"
            line1="Curfew: 10:00 PM"
            line2="Gate Opens: 06:00 AM"
          />

          <InfoCard
            title="Attendance"
            line1="This Week"
            line2="98% On Time"
          />

          <InfoCard
            title="Announcements"
            line1="Hostel Meeting"
            line2="Tomorrow at 7 PM"
          />
        </div>

        {/* Profile Section */}
        <div id="profile">
          <StudentProfile student={student} />
        </div>

      </div>
    </div>
  );
}
