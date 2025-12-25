import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export default function ScanQR() {
  const qrRef = useRef(null);
  const [scanned, setScanned] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (scanned) return;

    const html5QrCode = new Html5Qrcode("qr-camera");

    html5QrCode.start(
      { facingMode: "environment" }, // 👈 back camera only
      {
        fps: 10,
        qrbox: { width: 250, height: 250 }, // square focus area
        disableFlip: true
      },
      (decodedText) => {
        localStorage.setItem("LAST_QR", decodedText);
        setScanned(true);
        html5QrCode.stop();
      }
    );

    return () => {
      html5QrCode.stop().catch(() => {});
    };
  }, [scanned]);

  return (
    <div className="scan-page">
      {!scanned && (
        <>
          <h2 className="scan-title">Scan Hostel QR</h2>

          <div className="camera-wrapper">
            <div id="qr-camera" />
            <div className="scanner-overlay">
              <span className="corner tl" />
              <span className="corner tr" />
              <span className="corner bl" />
              <span className="corner br" />
            </div>
          </div>

          <p className="scan-hint">
            Align the QR within the frame
          </p>
        </>
      )}

      {scanned && (
        <div className="success-card">
          <div className="checkmark">✔</div>
          <h3>Scan Successful</h3>
          <p>Please wait at the gate</p>
          <button className="primary-btn" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
