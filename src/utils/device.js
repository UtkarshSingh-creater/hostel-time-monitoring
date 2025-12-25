export function getDeviceId() {
  let deviceId = localStorage.getItem("DEVICE_ID");
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("DEVICE_ID", deviceId);
  }
  return deviceId;
}
