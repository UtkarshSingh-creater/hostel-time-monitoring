import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export default function ScanQR() {
  const html5QrCodeRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [scanned, setScanned] = useState(false);
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      if (started) return;

      // Ensure container exists
      const elementId = "qr-camera";
      if (!document.getElementById(elementId)) return;

      const html5QrCode = new Html5Qrcode(elementId);
      html5QrCodeRef.current = html5QrCode;

      // 🔑 REQUIRED STEP (important)
      const devices = await Html5Qrcode.getCameras();
      if (!devices || devices.length === 0) {
        alert("No camera found");
        return;
      }

      // Prefer back camera
      const backCamera =
        devices.find(d => d.label.toLowerCase().includes("back")) || devices[0];

      await html5QrCode.start(
        backCamera.id,
        {
          fps: 10,
          qrbox: 250,
          disableFlip: true
        },
        (decodedText) => {
          localStorage.setItem("LAST_QR", decodedText);
          setScanned(true);
          html5QrCode.stop();
        }
      );

      setStarted(true);
    } catch (err) {
      console.error(err);
      alert("Camera permission denied or not supported");
    }
  };

  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="scan-page">
      <h2 className="scan-title">Scan Hostel QR</h2>

      {!started && !scanned && (
        <>
          <button className="primary-btn" onClick={startCamera}>
            Start Scanning
          </button>
          <p className="scan-hint">
            Tap to open camera and scan hostel QR
          </p>
        </>
      )}

      {started && !scanned && (
        <div className="camera-wrapper">
          <div id="qr-camera" />
          <div className="scanner-overlay">
            <span className="corner tl" />
            <span className="corner tr" />
            <span className="corner bl" />
            <span className="corner br" />
          </div>
        </div>
      )}

      {scanned && (
        <div className="success-card">
          <div className="checkmark">✔</div>
          <h3>Scan Successful</h3>
          <p>Please wait at the gate</p>
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
