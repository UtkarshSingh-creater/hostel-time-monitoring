import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export default function ScanQR() {
  const [scanned, setScanned] = useState(false);
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("STUDENT"));

  useEffect(() => {
    if (scanned) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText) => {
        localStorage.setItem("LAST_QR", decodedText);
        setScanned(true);
        scanner.clear();
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [scanned]);

  return (
    <div className="container scan-container">
      {!scanned && (
        <>
          <h2>Scan Hostel QR</h2>
          <div id="qr-reader" />
          <p className="hint">
            Point your camera at the QR displayed at the hostel gate
          </p>
        </>
      )}

      {scanned && (
        <div className="success-card">
          <div className="checkmark">✔</div>

          <h2>Scan Successful</h2>
          <p className="success-sub">
            Please wait at the gate for verification
          </p>

          {/* Student Info */}
          <div className="student-info">
            <img
              src="https://ui-avatars.com/api/?name=Student&background=16a34a&color=fff"
              alt="Student"
              className="avatar"
            />

            <div className="details">
              <p><b>{student.name}</b></p>
              <p>ID: {student.studentId}</p>
              <p>{student.hostel} • Room {student.room}</p>
            </div>
          </div>

          <button
            className="primary-btn"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
